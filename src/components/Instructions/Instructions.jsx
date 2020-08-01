import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import SealIcon from 'mdi-react/SealIcon';
import LedOnIcon from 'mdi-react/LedOnIcon';
import ExampleCardQuestion from '../../assets/images/Instructions/exampleQuestion.png';
import ExampleCardAnswer from '../../assets/images/Instructions/exampleAnswer.png';
import ExampleFiftyFifty from '../../assets/images/Instructions/exampleFiftyFifty.png';
import ExampleCheat from '../../assets/images/Instructions/exampleCheat.png';

import { BDiv } from 'bootstrap-4-react';

const Instructions = () => (
    <Fragment>
        <HelmetProvider>
            <Helmet>
                <title>Instructions</title>
            </Helmet>
            <section className="instructions container">
                <h2 className="instructions__title">How to play the game</h2>
                <p>Ensure you read this guide from start to finish.</p>
                <ul className="browser-default">
                    <li>This game has a duration of 15 minutes and ends as soon as your time elapses.</li>
                    <li>Each game consist of 15 questions.</li>
                    <li>Every question contains 4 opinions.</li>
                    <BDiv className="text-center" mt="3" mb="3">
                        <img src={ExampleCardQuestion} alt="Example Card" />
                    </BDiv>      
                    <li>Select the opinion which best answers the question by clicking (or selecting) it</li>
                    <BDiv className="text-center" mt="3" mb="3">
                        <img src={ExampleCardAnswer} alt="Example Card with answer" />
                    </BDiv>
                    <li>
                        Each game has 2 lifelines namely:
                        <ul className="browser-default">
                            <li>50-50 chances</li>
                            <li>5 hints</li>
                        </ul>
                    </li>
                    <li>Selecting a 50-50 lifeline by clicking the icon <SealIcon size="20" color="green" /> will remove 2 wrong answers, leaving the correct answer and one wrong answer.</li>
                    <BDiv className="text-center" mt="3" mb="3">
                        <img src={ExampleFiftyFifty} alt="Example Card fifty-fifty" />
                    </BDiv>
                    <li>Using a hint by clicking the icon <LedOnIcon size="18" color="green" /> will remove one wrong answer leaving two wrong answers and one correct answer. You can use as many hints as possible an a single question.</li>
                    <BDiv className="text-center" mt="3" mb="3">
                        <img src={ExampleCheat} alt="Example Card with cheat" />
                    </BDiv>
                    <li>Feel free to quit (or retire from) the game at any time, in that case your score will be revealed after words.</li>
                    <li>The timer starts as soon as the game loads.</li>
                    <li>Let's do this if you think you.ve got what it takes?</li>
                </ul>
                <BDiv pt="2" pb="5">
                    <span className="left"><Link to="/">No take me back.</Link></span>
                    <span className="right"><Link to="/play/test">Okay, let's do this!</Link></span>
                </BDiv>
            </section>
        </HelmetProvider>
    </Fragment>    
);

export default Instructions;