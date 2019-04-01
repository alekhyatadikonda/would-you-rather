import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

function QuestionContainer(props) {
  const { id, questions } = props;
  const question = questions[id];
  return (
    <div>
      {question ? <Question dashboard={false} question={question} /> : null}
    </div>
  );
}

function mapStateToProps({ authorizedUser, questions }, props) {
  const { id } = props.match.params;
  return {
    id,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionContainer);
