import FlexContainer from 'components/@commons/FlexContainer';
import React, { Suspense } from 'react';
import InvitationContent from './InvitationContent';
import SubmitButton from 'components/@commons/SubmitButton';
import useModal from 'hooks/useModal';
import { postGroupJoin } from 'apis/alba/joinGroup';
import LoginOrSignup from 'components/LoginSignUpButton/LoginOrSignup';
import useLogin from 'hooks/useLogin';
import useErrorHandler from 'error/useErrorHandler';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from 'error/ErrorPage';
import InvitationSkeleton from 'components/Suspenses/PageSkeletons/InvitationSkeleton';

interface Props {
  invitationKey: string;
  afterJoinHandler: () => void;
}

const InvitationSection = ({ invitationKey, afterJoinHandler }: Props): JSX.Element => {
  const loginState = useLogin().getLoginState();

  const { modalOnHandler, modalOffHandler } = useModal();
  const { apiErrorHandler } = useErrorHandler();

  // 초대 승인 클릭 시
  const acceptBtnHandler = (): void => {
    if (loginState.isLogin) {
      postGroupJoin({ invitationKey: invitationKey })
        .then((res) => {
          afterJoinHandler(); // 그룹 가입 완료 페이지로 이동
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    } else {
      modalOnHandler(
        <>
          <LoginOrSignup redirectPage={'/invited/' + invitationKey} />
          <button onClick={modalOffHandler}>닫기</button>
        </>,
      );
    }
  };

  return (
    <>
      <FlexContainer $wFull $padding="60px" $gap="36px">
        <ErrorBoundary fallback={<ErrorPage message="유효하지 않은 초대입니다" goMain />}>
          <Suspense fallback={<InvitationSkeleton />}>
            <InvitationContent invitationKey={invitationKey} />
            <SubmitButton onClick={acceptBtnHandler}>승인하기</SubmitButton>
          </Suspense>
        </ErrorBoundary>
      </FlexContainer>
    </>
  );
};

export default InvitationSection;
