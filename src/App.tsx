import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import { ConfigProvider } from 'antd';

import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Board from './components/Board';
import Card from './components/Card';
import useFetchData from './hooks/useFetchData';
import { antdTheme } from './styles/antdTheme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useFetchData();

  return (
    <>
      <ConfigProvider theme={antdTheme}>
        <GlobalStyle />
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/card/:cardId" element={<Card />} />
            <Route path="/archivedCards" element={<h1>Archiving to be implemented.</h1>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default App;
