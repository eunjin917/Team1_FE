import React from 'react';
import BorderBox from 'components/@commons/BorderBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import usePreviewSelected from 'hooks/alba/apply/usePreviewSelected';
import weekdayArray from 'utils/weekdayArray';
import SubmitButton from 'components/@commons/SubmitButton';
import { myTheme } from 'styles/myTheme';
import { stringDateMoveKor } from 'utils/dateToString';

const PreviewSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { submitApplyHandler, checkedTimeOnly, goSelectHandler } = usePreviewSelected(startWeekDate);

  return (
    <FlexContainer $wFull $gap="36px">
      <button onClick={goSelectHandler}> 편집하기 </button>
      <FlexContainer $wFull>
        {weekdayArray.map((weekday, dayIndex) => (
          <BorderBox gradation key={`${dayIndex}요일`}>
            <FlexContainer $wFull $direction="row" $padding="20px 24px" $gap="0">
              <Text size="lg" margin="0">
                {stringDateMoveKor(startWeekDate, dayIndex)}
              </Text>
              <Text size="lg" margin="0 auto 0 28px">
                {weekday.kor}
              </Text>
              <Text
                margin="0 0 0 auto"
                size="lg"
                color={checkedTimeOnly(dayIndex) === '휴무' ? myTheme.color.gray : '#0066FF'}
                weight="semiBold"
              >
                {checkedTimeOnly(dayIndex)}
              </Text>
            </FlexContainer>
          </BorderBox>
        ))}
      </FlexContainer>

      <SubmitButton onClick={submitApplyHandler}>제출하기</SubmitButton>
    </FlexContainer>
  );
};

export default PreviewSection;
