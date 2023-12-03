class Quiz{
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex(){
        return this.questions[this.questionIndex];
    }

    guess(answer){
        if(this.getQuestionIndex().isCorrectAnswer(answer)){
            this.score++
        }
        this.questionIndex++;
    }

    display(){
        console.log(this.questions);
    }

    isEnded(){
        return this.questionIndex === this.questions.length;
    }
}

export default Quiz;