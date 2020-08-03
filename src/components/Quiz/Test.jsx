import React, { Fragment, Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classNames from 'classnames';

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
            usedFiftyFifty: false,
            previousButtonDisabled: false,
            nextButtonDisabled: true
        };
        this.interval = null;
        this.correctAnswerSnd = React.createRef();
        this.wrongAnswerSnd = React.createRef();
        this.buttonClickSnd = React.createRef();
    }

    componentDidMount() {
        const { questions, currentQuestion, prevQuestion, nextQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, prevQuestion, nextQuestion);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                this.controlButtonDisabled();
            });
        }
    };

    controlOptionClick = (e) => {
       if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                this.correctAnswerSnd.current.play()
            }, 100);
           this.correctAnswer();
       } else {
            setTimeout(() => {
                this.wrongAnswerSnd.current.play()
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

    controlButtonDisabled = () => {
        if (this.state.prevQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
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

    controlFiftyFiftyClick = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;
            let count = 0;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                            randomNumbers.push(randomNumber);
                            count++;
                    } else {
                        while(true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            }
            while (count < 2);

            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });

            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty--,
                usedFiftyFifty: true
            }));
        }
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        });

        this.setState({
            usedFiftyFifty: false
        })
    }

    controlHintsClick = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            while(true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && !this.state.prevRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                    if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints--,
                                prevRandomNumbers: prevState.prevRandomNumbers.concat(randomNumber)
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
        this.buttonClickSnd.current.play();
    }

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 500
        });
        this.setState(prevState => ({
            score: prevState.score++,
            correctAnswers: prevState.correctAnswers++,
            currentQuestionIndex: prevState.currentQuestionIndex++,
            numberOfSelectedQuestion: prevState.numberOfSelectedQuestion++
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endTest();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
            }
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers++,
            currentQuestionIndex: prevState.currentQuestionIndex++,
            numberOfSelectedQuestion: prevState.numberOfSelectedQuestion++
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endTest();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
            }
        });
    }

    startTimer = () => {
        const countDownTime = Date.now() * 1000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const testTimeElem = document.getElementById('test__time');
            
            const minutes = Math.floor((300000 % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            if (minutes < 1) {
                testTimeElem.style.color = 'red';
            }

            if (minutes === 0 && seconds === '00') {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endTest();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds,
                        distance
                    }
                });
            }
        }, 1000);
    }

    endTest = () => {
        const testSummary = {
            score: this.state.score,
            numberOfQuestions: this.state.numberOfQuestions,
            numberOfSelectedQuestion: this.state.numberOfSelectedQuestion,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
            fiftyFiftyUsed: 2 - this.state.fiftyFifty,
            hintUsed: 5 - this.state.hints
        };

        setTimeout(() => {
            this.props.history.push('/play/result', testSummary);
        }, 500)
    }

    render() {
        const { 
            currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions, 
            hints, 
            fiftyFifty,
            time 
        } = this.state;

        return (
            <Fragment>
                <HelmetProvider>
                    <Helmet>
                        <title>Test</title>
                    </Helmet>
                    <Fragment>
                        <audio ref={this.correctAnswerSnd} src={CorrentAnswerSound}></audio>
                        <audio ref={this.wrongAnswerSnd} src={WrongAnswerSound}></audio>
                        <audio ref={this.buttonClickSnd} src={ButtonClickSound}></audio>
                    </Fragment>
                    <section className="test">
                        <BDiv className="test__icons" display="flex" justifyContent="between" ml="2" mr="2">
                            <p onClick={this.controlFiftyFiftyClick}>
                                <SealIcon size="20"/>
                                <span>{fiftyFifty}</span>
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
                                <span id="test__time">
                                    <ClockIcon size="18" />
                                    <span className="ml-1">{time.minutes}:{time.seconds}</span>
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
                            <button
                                className={classNames('', {'disable': this.state.previousButtonDisabled})}  
                                id="prev-question" 
                                onClick={this.controlButtonClickAction}
                            >
                                Previous
                            </button>
                            <button 
                                id="quit" 
                                onClick={this.controlButtonClickAction}
                            >
                                Quit
                            </button>
                            <button 
                                className={classNames('', {'disable': this.state.nextButtonDisabled})} 
                                id="next-question" 
                                onClick={this.controlButtonClickAction}
                            >
                                Next
                            </button>
                        </div>
                    </section>
                </HelmetProvider>
            </Fragment>
        );
    }
}

export default Test;