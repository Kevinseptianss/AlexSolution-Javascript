const fs = require("fs");

function readCSV(filePath) { //this function is to read the CSV file remove the first line and remove the \r in string
    const data = fs.readFileSync(filePath, 'utf8');
    let dataArr = [];
    data.split("\n").slice(1).map(line => line != "" ? dataArr.push([line.split(",")[0], line.split(",")[1].trim()]) : null);
     //split the data into array from whitespace \n, then i delete the first row, then i map it to get every array
     //because yout CSV have blank enter i check it the array is empty, then i put in data array 2D, then i split it by comma
     //for the first array, in the second array i split it again by coma but i take the right side, then i trim every white space
     //because your CSV contain /r in the end of file
    return dataArr;
}

function arrAreEqual(arr1, arr2) { //this function is to check if the learned course and the prerequisites is matching
    if (arr1.length < arr2.length) {
        return false;
    }
    return arr2.every(item => arr1.includes(item));
    //return arr1.filter(item => arr2.includes(item)).length > 0;
}

const courses = readCSV('courses.csv'); //reading the course
const prerequisites = readCSV('prerequisites.csv'); //reading the prerequisites

let preArr = []; //prerequisites array like course 8 need complete course 6,7,10,12
let preLearned = []; //if course complete put in this array

for (let i = 0; i < courses.length; i++) { //looping the prerequisites to get every line
    let learned = []; //the required course for the current course
    for (let j = 0; j < prerequisites.length; j++) { //looping the prerequisites to get every line
        if (prerequisites[j][0] == courses[i][0]) { //check if prerequisites course match with course
            learned.push(prerequisites[j][1]); //put in array
        }
    }
    preArr.push([courses[i][0], learned]); //put in prerequisites array
}
function main() { //the main function
    while (preLearned.length < 11) { //looping until we get the 12 course
        for (let i = 0; i < preArr.length; i++) { //looping the prerequisites array
            if (!preLearned.includes(preArr[i][0])) { //check if course not already learned 
                if (preArr[i][1].length == 0) { //check if the course doesn't have prerequisites
                    preLearned.push(preArr[i][0]); //put in learned array
                } else { //if not
                    console.log(preLearned + " - (" +  preArr[i][0] + " - " + preArr[i][1] + ")"); //for debugging and see the array that learned and the required prerequisites
                    if (arrAreEqual(preLearned, preArr[i][1])) { //if the prerequisites matching with course already been taken then
                        preLearned.push(preArr[i][0]); //we put it in the learned array
                    }
                }
            }
        }
    }
    console.log(preLearned); //printed the result
}

main(); //your prerequisites is imposible to complete because you have course 4 that require course 9, 
        //the course 9 needed course 5, the course 5 needed course 4 it gonna loop if you delete in 
        // prerequisites.csv 4,9 it will run becuase course id 4,9 i think the problem



