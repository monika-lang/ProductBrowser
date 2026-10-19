import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "./pages/home";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/products";

const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout/>,
        children:[
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'products',
                element: <ProductsPage/>
            },
            {
                path: 'products/:id',
                element: <ProductsPage/>
            }
            
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

const App:React.FC = ()=>{
    return <RouterProvider router={router}/>
}
export default App;