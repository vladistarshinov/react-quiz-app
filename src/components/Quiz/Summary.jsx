import React, { Component, Fragment } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import CheckCircleOutlineIcon from 'mdi-react/CheckCircleOutlineIcon'

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfSelectedQuestion: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            fiftyFiftyUsed: 0,
            hintUsed: 0
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfSelectedQuestion: state.numberOfQuestions - state.correctAnswers - state.wrongAnswers,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
                hintUsed: state.hintUsed
            });
        }
    }

    render() {
        const { state } = this.props.location;
        let testSummary, mark;

        if (state.score <= 50) {
            mark = 'You need much time for learning!';
        } else if (state.score > 50 && state.score <= 69) {
            mark = 'You can do better! Have a good time for learning!';
        } else if (state.score > 69 && state.score <= 84) {
            mark = 'Good! Keep up the good work!';
        } else {
            mark = 'Congratulations! You have a excellent result!';
        }

        if (state !== undefined) {
            testSummary = (
                <Fragment>
                    <div className="text-center mt-3 text--green">
                        <CheckCircleOutlineIcon className="summary__icon" size={60}/>
                        <h3>Quiz is finished!</h3>
                    </div>
                    <div className="container text-center summary__main">
                        <h4>{mark}</h4>
                        <h3>Your score: {this.state.score}&#37;</h3>
                        <span className="left">Total number of questions: </span>
                        <span className="right">{state.numberOfQuestions}</span>
                        <br />
                        <span className="left">Number of fulfiled questions: </span>
                        <span className="right">{state.numberOfSelectedQuestion}</span>
                        <br />
                        <span className="left">Number of corrent answers: </span>
                        <span className="right">{state.correctAnswers}</span>
                        <br />
                        <span className="left">Number of wrong answers: </span>
                        <span className="right">{state.wrongAnswers}</span>
                        <br />
                        <span className="left">Number of used hints: </span>
                        <span className="right">{state.hintUsed}</span>
                        <br />
                        <span className="left">Number of used 50:50: </span>
                        <span className="right">{state.fiftyFiftyUsed}</span>
                        <br />
                    </div>
                    <section>
                        <ul>
                            <li>
                                <Link className="btn-home" to="/">Back to home</Link>
                            </li>
                            <li>
                                <Link className="btn-test" to="/play/test">Run test again</Link>
                            </li>
                        </ul>
                    </section>
                </Fragment>    
            );
        } else {
            testSummary = (
                <section>
                    <h3 className="no-results">Please, take a quiz for displaying results!</h3>
                    <ul>
                        <li>
                            <Link to="/">Back to home</Link>
                        </li>
                        <li>
                            <Link to="/play/test">Run test again</Link>
                        </li>
                    </ul>
                </section>
            )
        }

        return (
            <Fragment>
                <HelmetProvider>
                    <Helmet>
                        <title>Quiz App - Summary</title>
                    </Helmet>
                    <div className="summary">{testSummary}</div>
                </HelmetProvider>
            </Fragment>
        );
    }
}

export default Summary;