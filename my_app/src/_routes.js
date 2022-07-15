import React from 'react';
import Home from './home';
import New from './new';
import Update from './update';
import PracticeRef from './practice_ref';

const routes=[
    {
        path: "/",
        element:<Home />
    },
    {
        path: "/create",
        element:<New/>
    },
    {
        path: "/update/:id",
        element:<Update/>
    },
    {
        path: "/practice",
        element: <PracticeRef/>
    }
]

export default routes;
