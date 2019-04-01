import {GET_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION} from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };

        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [question.id]: question,
            };

        case ANSWER_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat(action.authorizedUser),
                    },
                },
            };

        default:
            return state;
    }
}
