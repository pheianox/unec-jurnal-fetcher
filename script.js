let lib = async function (eduYear, eduSemestr, seminarLessonType, lectureLessonType) {
    const subjects = await getSubjects(await getSubjectListFormDoc());
    async function getSubjects(doc) {
        const subjects = [];
        const rows = [...doc.querySelectorAll('#studentEvaluation-grid table tbody tr')].map(row => [...row.children]);
        for (const children of rows) {
            const _subjectId = children[1].textContent || '';
            const _formId = children[5].textContent || '';
            subjects.push(Object.assign({ w____subject_id: _subjectId, subject_name: children[2].textContent || '', subject_credit_count: parseInt(children[3].textContent || '') || 0, subject_name_full: children[4].textContent || '', w____form_id: _formId }, await getSubjectPerfromance(_subjectId, _formId)));
        }
        return subjects;
    }
    async function getSubjectPerfromance(subjectId, formId) {
        const promises = await Promise.all([fetchSubjectPerformanceForm(subjectId, seminarLessonType, formId), fetchSubjectPerformanceForm(subjectId, lectureLessonType, formId)]);
        const seminarForm = stringToElement(promises[0]);
        const lectureForm = stringToElement(promises[1]);
        const seminarLessons = getLessonList(seminarForm);
        const lectureLessons = getLessonList(lectureForm);
        const allLessons = [...seminarLessons, ...lectureLessons];
        const finalEval = seminarForm.querySelector('#finalEval table tbody tr');
        if (!finalEval)
            throw Error("no #finalEval last table row");
        const rows = [...finalEval.children];
        const MAX_MISSED_LES_PER = 26.0;
        const totalKollokviumPoints = elementToNumber(rows[4]);
        const missedLessonsTotalPercentage = elementToNumber(rows[14]);
        const kesir = missedLessonsTotalPercentage > MAX_MISSED_LES_PER;
        const kollokviumPoints = totalKollokviumPoints;
        const seminarsPoints = elementToNumber(rows[5]);
        const totalPoints = elementToNumber(rows[9]);
        const pointsLeftFor51 = 51 - totalPoints;
        const totalLessonsCount = allLessons.length;
        const missed_lecutres_count = lectureLessons.filter(l => l.grade.trim() === 'q/b').length;
        const missed_seminars_count = seminarLessons.filter(l => l.grade.trim() === 'q/b').length;
        const missedLessonsCount = missed_lecutres_count + missed_seminars_count;
        const missedLessonsUnitPercentage = missedLessonsCount / missedLessonsTotalPercentage;
        const performance = {
            seminar_lessons: seminarLessons,
            lecture_lessons: lectureLessons,
            missed_lessons_total_percentage: missedLessonsTotalPercentage,
            kollokvium_points: kollokviumPoints,
            seminar_points: seminarsPoints,
            total_points: totalPoints,
            points_left_to_51: pointsLeftFor51,
            missed_lessons_count: missedLessonsCount,
            total_lessons_count: totalLessonsCount,
            missed_lessons_unit_percentage: missedLessonsUnitPercentage,
            missed_lecutres_count,
            missed_seminars_count
        };
        return performance;
    }
    function stringToElement(string) {
        const elem = document.createElement('html');
        elem.innerHTML = string;
        return elem;
    }
    function elementToNumber(element) {
        if (!element)
            return 0;
        return parseInt(element.textContent || '') || 0;
    }
    function getLessonList(form) {
        let lessonList = [];
        const rows = [...form.querySelectorAll('#evaluation table tbody tr')].map(row => [...row.children]);
        for (const children of rows) {
            lessonList.push({
                date: children[1].textContent || '',
                topic: children[2].textContent || '',
                grade: children[3].textContent || '',
            });
        }
        return lessonList;
    }
    async function getSubjectListFormDoc() {
        const response = await fetch(`http://kabinet.unec.edu.az/az/studentEvaluation?eduYear=${eduYear}&eduSemester=${eduSemestr}&lessonType=${seminarLessonType}`, {
            "body": null,
            "method": "GET",
        });
        if (response.status != 200)
            throw new Error('fetchSubjectListForm');
        var parser = new DOMParser();
        // Parse the text
        var doc = parser.parseFromString(await response.text(), "text/html");
        return doc;
    }
    async function fetchSubjectPerformanceForm(subjectId, lessonType, formId) {
        const response = await fetch("http://kabinet.unec.edu.az/az/studentEvaluationPopup", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,az;q=0.8,ru;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest"
            },
            "body": `id=${subjectId}&lessonType=${lessonType}&edu_form_id=${formId}`,
            "method": "POST",
        });
        if (response.status != 200)
            throw new Error('fetchSubjectPerformanceForm');
        return await response.text();
    }
    return { subjects };
};
