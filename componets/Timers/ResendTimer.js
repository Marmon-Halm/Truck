import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components/native';
import { color } from '../../screens/color';
import SmallTexts from '../Texts/SmallTexts';
import RegularTexts from '../Texts/RegularTexts';
const { primary, red, success } = color;



const StyledView = styled.View`
    align-items: center;
    margin-bottom: 10px;
`;

const ResendText = styled(RegularTexts)`
    color: ${primary};
    ${(props) => {
        const { resendStatus } = props;
        if (resendStatus == 'Failed') {
            return `color: ${red}`;
        } else if (resendStatus == 'Sent!') {
            return `color: ${primary}`;
        }
    }}
`;


const ResendTimer = ({ activeResend, setActiveResend, targetTimeInSeconds, resendEmail, resendStatus, ...props }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);

    let resendTimerInterval;

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000)
    };

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference / 1000));
        } else {
            clearInterval(resendTimerInterval);
            setActiveResend(true);
            setTimeLeft(null);
        };
    };

    useEffect(() => {
        triggerTimer(targetTimeInSeconds);
        return () => {
            clearInterval(resendTimerInterval);
        };
    }, []);

    return <StyledView {...props}>
        <RegularTexts style={{ textAlign: 'center', color: '#585656' }}>Didn't receive code? <RegularTexts style={{ color: primary, opacity: !activeResend ? 0.65 : 1 }} onPress={() => resendEmail(triggerTimer)} disabled={!activeResend}>
            <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
        </RegularTexts>
        </RegularTexts>

        {!activeResend && (
            <SmallTexts style={{ textAlign: 'center' }}>
                in <SmallTexts style={{ fontFamily: 'Manrope_700Bold' }}>{timeLeft || targetTime}</SmallTexts> second(s)</SmallTexts>

        )}
    </StyledView>
};

export default ResendTimer;