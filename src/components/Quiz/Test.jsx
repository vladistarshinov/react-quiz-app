import React, { Fragment, Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import SealIcon from 'mdi-react/SealIcon';
import LedOnIcon from 'mdi-react/LedOnIcon';
import ClockIcon from 'mdi-react/ClockIcon';

import { BDiv } from 'bootstrap-4-react';

class Test extends Component {
/*     constructor(props) {
        super(props);
    }
 */
    render() {
        return (
            <Fragment>
                <HelmetProvider>
                    <Helmet>
                        <title>Test</title>
                    </Helmet>
                    <section className="test">
                        <BDiv className="test__icons" display="flex" justifyContent="between" ml="2" mr="2">
                            <p>
                                <SealIcon size="20" color="green" />
                                <span>2</span>
                            </p>
                            <p>
                                <LedOnIcon size="20" color="green" />
                                <span>5</span>
                            </p>
                        </BDiv>
                        <BDiv className="test__attempts" display="flex" justifyContent="between">
                            <p>
                                <span>1 of 15</span>
                            </p>
                            <p>
                                <span>
                                    <ClockIcon size="18" />
                                    <span className="ml-1">1:58</span>
                                </span>
                            </p>
                        </BDiv>
                        <h5 className="test__question">React JS is a ...</h5>
                        <div className="test__answers">
                            <p className="test__answers-option">JavaScript library</p>
                            <p className="test__answers-option">Framework</p>
                        </div>
                        <div className="test__answers">
                            <p className="test__answers-option">MVC-framework</p>
                            <p className="test__answers-option">Server platform</p>
                        </div>
                        <div className="test__btn">
                            <button className="btn_actions">Previous</button>
                            <button className="btn_actions">Quit</button>
                            <button className="btn_actions">Next</button>
                        </div>
                    </section>
                </HelmetProvider>
            </Fragment>
        );
    }
}

export default Test;