import React, { Fragment, Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { BDiv } from 'bootstrap-4-react';
import M from 'materialize-css';

import isEmpty from '../../utils/is-empty';

import SealIcon from 'mdi-react/SealIcon';
import LedOnIcon from 'mdi-react/LedOnIcon';
import ClockIcon from 'mdi-react/ClockIcon';
import questions from '../../assets/db/questions.json';
import CorrentAnswerSound from '../../assets/audio/correct-answer.mp3';
import WrongAnswerSound from '../../assets/audio/error-answer.mp3';
import ButtonClickSound from '../../assets/audio/button-click.mp3';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            answer: '',
            currentQuestion: {},
            prevQuestion: {},
            nextQuestion: {},
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {},
            currentQuestionIndex: 0,
            numberOfQuestions: 0,
            numberOfSelectedQuestion: 0,
            hints: 5,
            prevRandomNumbers: [],
            fiftyFifty: 2,
            usedFiftyFitty: false
        };
    }

    componentDidMount() {
        const { questions, currentQuestion, prevQuestion, nextQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, prevQuestion, nextQuestion);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, prevQuestion, nextQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            prevQuestion = questions[currentQuestionIndex - 1];
            nextQuestion = questions[currentQuestionIndex + 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                prevQuestion,
                nextQuestion,
                numberOfQuestions: questions.length,
                answer,
                prevRandomNumbers: []
            }, () => {
                this.showOptions();
            });
        }
    };

    controlOptionClick = (e) => {
       if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                document.getElementById('correct-answer').play();
            }, 100);
           this.correctAnswer();
       } else {
            setTimeout(() => {
                document.getElementById('wrong-answer').play();
            }, 100);
           this.wrongAnswer();
       }
    }

    controlButtonClickAction = (e) => {
        switch (e.target.id) {
            case 'prev-question':
                this.controlPrevButtonClick();
                break;
            case 'next-question':
                this.controlNextButtonClick();
                break;
            case 'quit':
                this.controlQuitButtonClick();
                break;
            default: 
                break;
        }
        this.controlButtonClickSound();
    }

    controlPrevButtonClick = () => {
        this.controlButtonClickSound();
        this.state.prevQuestion !== undefined && this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex--
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
        });
    }

    controlNextButtonClick = () => {
        this.controlButtonClickSound();
        this.state.nextQuestion !== undefined && this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex++
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
        });
    }

    controlQuitButtonClick = () => {
        this.controlButtonClickSound();
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/');
        }
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        })
    }

    controlHintsClick = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, i) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = i;
                }
            });

            while(true) {
                const randNum = Math.round(Math.random() * 3);
                if (randNum !== indexOfAnswer && !this.state.prevRandomNumbers.includes(randNum)) {
                    options.forEach((option, i) => {
                    if (i === randNum) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints--,
                                prevRandomNumbers: prevState.prevRandomNumbers.concat(randNum)
                            }));
                    }
                    });
                    break;
                }
                if (this.state.prevRandomNumbers.length >= 2) break;
            }
        }
    }

    controlButtonClickSound = () => {
        document.getElementById('button-click').play();
    };

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score++,
            correctAnswers: prevState.correctAnswers++,
            currentQuestionIndex: prevState.currentQuestionIndex++,
            numberOfSelectedQuestion: prevState.numberOfSelectedQuestion++
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers++,
            currentQuestionIndex: prevState.currentQuestionIndex++,
            numberOfSelectedQuestion: prevState.numberOfSelectedQuestion++
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
        });
    }

    render() {
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints } = this.state;

        return (
            <Fragment>
                <HelmetProvider>
                    <Helmet>
                        <title>Test</title>
                    </Helmet>
                    <Fragment>
                        <audio id="correct-answer" src={CorrentAnswerSound}></audio>
                        <audio id="wrong-answer" src={WrongAnswerSound}></audio>
                        <audio id="button-click" src={ButtonClickSound}></audio>
                    </Fragment>
                    <section className="test">
                        <BDiv className="test__icons" display="flex" justifyContent="between" ml="2" mr="2">
                            <p>
                                <SealIcon size="20"/>
                                <span>2</span>
                            </p>
                            <p onClick={this.controlHintsClick}>
                                <LedOnIcon className="test__icons-hints" size="20" />
                                <span>{hints}</span>
                            </p>
                        </BDiv>
                        <BDiv className="test__attempts" display="flex" justifyContent="between">
                            <p>
                                <span>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            </p>
                            <p>
                                <span>
                                    <ClockIcon size="18" />
                                    <span className="ml-1">1:58</span>
                                </span>
                            </p>
                        </BDiv>
                        <h5 className="test__question">{currentQuestion.question}</h5>
                        <div className="test__answers">
                            <p className="test__answers-option option" onClick={this.controlOptionClick}>{currentQuestion.optionA}</p>
                            <p className="test__answers-option option" onClick={this.controlOptionClick}>{currentQuestion.optionB}</p>
                        </div>
                        <div className="test__answers">
                            <p className="test__answers-option option" onClick={this.controlOptionClick}>{currentQuestion.optionC}</p>
                            <p className="test__answers-option option" onClick={this.controlOptionClick}>{currentQuestion.optionD}</p>
                        </div>
                        <div className="test__btn">
                            <button id="prev-question" className="btn_actions" onClick={this.controlButtonClickAction}>Previous</button>
                            <button id="quit" className="btn_actions" onClick={this.controlButtonClickAction}>Quit</button>
                            <button id="next-question" className="btn_actions" onClick={this.controlButtonClickAction}>Next</button>
                        </div>
                    </section>
                </HelmetProvider>
            </Fragment>
        );
    }
}

export default Test;