import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import KakaoAuth from 'auth/KakaoAuth';
import LoginPage from 'pages/LoginPage';
import SigninPage from 'pages/SigninPage';
import HeaderNB from 'components/organisms/HeaderNB';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <HeaderNB />
      <ErrorBoundary fallback={<p>에러...</p>}>
        <Suspense fallback={<p>로딩...</p>}>
          <Routes>
            <Route path={'/'} element={<div>메인...</div>} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/login/kakao'} element={<KakaoAuth />} />
            <Route path={'/signin'} element={<SigninPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;