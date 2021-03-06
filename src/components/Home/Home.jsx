import React, { Fragment } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import CubeOutlineIcon from 'mdi-react/ChevronUpBoxIcon';

import { BDiv } from 'bootstrap-4-react';

const Home = () => (
    <Fragment>
        <HelmetProvider>
            <Helmet>
                <title>Quiz App</title>
            </Helmet>
            <BDiv id="home" display="flex" justifyContent="around" alignItems="center">
                <section className="home">
                    <BDiv className="mt-3 text-center">
                        <CubeOutlineIcon color="orange" size={128} />
                    </BDiv>
                    <h1 className="home__title text-center">Quiz App</h1>
                    <BDiv w="100" display="flex" justifyContent="around" mt="5">
                        <Link to="/react-quiz-app/play/instructions" className="home__btn home__btn-play">Play</Link>
                    </BDiv>
                    <BDiv w="100" display="flex" justifyContent="around" mt="3">
                        <Link to="/react-quiz-app/login" className="home__btn home__btn-login">Login</Link>
                        <Link to="/react-quiz-app/register" className="home__btn home__btn-register">Register</Link>
                    </BDiv>
                </section>
            </BDiv>
        </HelmetProvider>
    </Fragment>   
)

export default Home;