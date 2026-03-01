
class Question {
    constructor(quest, correct, ans1, ans2, ans3, ans4){
        this.quest = quest;
        this.correct = correct
        this.answer_array = [
            ans1, ans2, ans3, ans4, correct
        ]
    }
    
}

function generateQuestion(){
    const num1 = getRandomNumber(10, 50);
    const num2 = getRandomNumber(1, 20);
    
    const correctAnswer = num1 + num2;

    const wrongAnswer = new Set();
    while (wrongAnswer.size < 4){
        const wrong = getRandomNumber(correctAnswer - 20 , correctAnswer + 20)
        if (wrong !== correctAnswer && wrong > 0 ){
            wrongAnswer.add(wrong)
        }
    }

    const wrongArray = Array.from(wrongAnswer);
    return new Question(
        `${num1} + ${num2}`,
        correctAnswer,
        wrongArray[0],
        wrongArray[1],
        wrongArray[2],
        wrongArray[3]
    )
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

question_array = []

for (let i = 0 ; i < 30 ; i ++){
    question_array.push(generateQuestion())
}

let quest_html = document.querySelector('.question')
let answer_group_html = document.querySelector('.answer').children

console.log('array :', question_array)
console.log(answer_group_html)
let num_quest = 0

function shuffle(array){
    for (let i = array.length - 1; i > 0 ; i-- ) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }    
    return array;
}

let jawaban_benar = 0;
let jawaban_salah = 0;

function next(){
    quest_html.innerHTML = question_array[num_quest]['quest']
    let shuffleArray = shuffle([...question_array[num_quest]['answer_array']]);
    console.log(shuffleArray);
    
    for (let i = 0 ; i < 5 ; i ++){
        answer_group_html[i].innerHTML = shuffleArray[i];
        
        answer_group_html[i].onclick  = function(){
            const selected = shuffleArray[i];
            const correct = question_array[num_quest]['correct'];

            if (selected === correct){
                this.style.backgroundColor = 'green';
                jawaban_benar ++;
            }else{
                this.style.backgroundColor = 'red';
                jawaban_salah ++;
            }

            setTimeout(()=>{
                this.style.backgroundColor = '';
                num_quest ++;
                next();
            }, 500)
        };
    }
}
next()

function result(){
    console.log(jawaban_benar);
    console.log(jawaban_salah);
    document.querySelector('.correct').innerHTML = jawaban_benar;
    document.querySelector('.wrong').innerHTML = jawaban_salah;
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
}


function startQuiz() { 
    document.querySelector('.onboarding').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    setTimeout(result, 10000)
}

