# unec-jurnal-fetcher
Fetches student's subjects and all data needed for self analysis

**NOTE:** This script might not work. Constant updates needed

## Usage
### 1. Go to "elektron jurnal" section in your unec kabinet

![image](https://user-images.githubusercontent.com/77569421/207960933-557ceb43-eaf8-4f5a-b807-3519795bff65.png)

### 2. Select year, then select semester and then select "seminar"

![image](https://user-images.githubusercontent.com/77569421/207961147-9e3a3124-049b-4880-8b2b-54524bb8dd66.png)


### 3. Look at addressbar of your browser you will see this

![image](https://user-images.githubusercontent.com/77569421/207961246-94311242-6652-4acd-b3bc-a2311dbb25b9.png)

### 4. Write somewhere those values to rememeber them
eduYear = 1000042
eduSemester = 1000097
lessonType = 4101

### 5. Change seminar to muhazire

![image](https://user-images.githubusercontent.com/77569421/207961935-8f9d65c1-7d6d-4c7f-99d9-f443136645e2.png)

### 6. Look at addressbar and you will see that lessonType changed

![image](https://user-images.githubusercontent.com/77569421/207962030-010d1cd0-83d9-42bd-a9e9-e1a4a2db8e5f.png)

### 7. Rememeber lessonType again
```
eduYear = 1000042
eduSemester = 1000097

lessonTypeSeminar = 4101 (previous lessonType)
lessonTypeMuhazire = 4100 (current lessonType)
```

### 8. Open dev tools
click right click anywhere on the page and in the menu select "inspect"

### 9. Go to console

![image](https://user-images.githubusercontent.com/77569421/207962698-f408c412-45c3-48fa-afff-9da60666a986.png)

### 10. Paste script.js there press enter

### 11. Call library function with arguments
```ts
lib("1000042", "1000097", "4101", "4100")
```
where
```ts
// 1000042 - eduYear
// 1000097 - eduSemester
// 4101 - lessonTypeSeminar
// 4100 - lessonTypeMuhazire
```
### 12. Wait. After done you will see results

![image](https://user-images.githubusercontent.com/77569421/207963267-48a54acd-7b99-407d-a043-c07598f34e0f.png)

### 13. Done. You can also copy that data to clipboard by right click on it and select "copy object"
