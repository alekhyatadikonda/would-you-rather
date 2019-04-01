import { _saveQuestion, _saveQuestionAnswer, _getUsers } from '../utils/_DATA'

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question: question,
    };
}

export function receiveQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions: questions,
    };
}

export function answerQuestion(authorizedUser, qid, answer) {
    return {
        type: ANSWER_QUESTION,
        authorizedUser,
        qid,
        answer,
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return function(dispatch, getState) {
        const { authorizedUser } = getState();
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authorizedUser,
        }).then(function(question) { dispatch(addQuestion(question)) });
    };
}

export function handleAnswerQuestion(question, answer) {
    return function(dispatch, getState) {
        const { authorizedUser } = getState();
        _getUsers().then((users)=>{
            const answers = Object.keys(users[authorizedUser].answers);
            if (answers.indexOf(question.id) > -1) {
                return alert('Cannot vote for this question again!');
            }
            else{
                return _saveQuestionAnswer({
                    authedUser: authorizedUser,
                    qid: question.id,
                    answer,
                }).then(function() { dispatch((answerQuestion(authorizedUser, question.id, answer))) })
            }
        })
    }
}
