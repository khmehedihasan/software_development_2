import '../src/assets/css/custom.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import useFirstLoad from './hooks/useFirstLoad';

import IsLogIn from './pages/IsLogIn';
import IsLogOut from './pages/IsLogOut';

import LogIn from './pages/LogIn';
import Home from './pages/dashboard/Home';
import Error from './pages/Error';

import AddCategory from './pages/category/AddCategory';
import AllCategory from './pages/category/AllCategory';
import EditCategory from './pages/category/EditCategory';

import AddSubCategory from './pages/subCategery/AddSubCategory';
import AllSubCategory from './pages/subCategery/AllSubCategory';
import EditSubCategory from './pages/subCategery/EditSubCategory';

import AllProduct from './pages/product/AllProduct';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import ViewPorduct from './pages/product/ViewPorduct';

import AddSupplier from './pages/supplier/AddSupplier';
import AllSupplier from './pages/supplier/AllSupplier';
import EdiSupplier from './pages/supplier/EdiSupplier';
import ViewSupplier from './pages/supplier/ViewSupplier';
import SupplierReturnReport from './pages/supplier/return/SupplierReturnReport';
import SupplierReturn from './pages/supplier/return/SupplierReturn';
import InvoiceSI from './pages/supplier/return/Invoice';
import PrintSI from './pages/supplier/return/Print';
import SupplierDueReport from './pages/supplier/due/SupplierDueReport';
import SupplierDue from './pages/supplier/due/SupplierDue';
import InvoiceSD from './pages/supplier/due/Invoice';
import PrintSD from './pages/supplier/due/Print';

import AllCustomer from './pages/customer/AllCustomer';
import AddCustomer from './pages/customer/AddCustomer';
import EdiCustomer from './pages/customer/EdiCustomer';
import ViewCustomer from './pages/customer/ViewCustomer';
import CustomerReturnReport from './pages/customer/return/CustomerReturnReport';
import CustomerReturn from './pages/customer/return/CustomerReturn';
import InvoiceCI from './pages/customer/return/Invoice';
import PrintCI from './pages/customer/return/Print';
import CustomerDueReport from './pages/customer/due/CustomerDueReport';
import CustomerDue from './pages/customer/due/CustomerDue';
import InvoiceCD from './pages/customer/due/Invoice';
import PrintCD from './pages/customer/due/Print';

import PurchaseProduct from './pages/purchase/PurchaseProduct';
import AllPurchase from './pages/purchase/AllPurchase';
import Invoice from './pages/purchase/Invoice';
import Print from './pages/purchase/Print';

import SaleProduct from './pages/sale/SaleProduct';
import AllSale from './pages/sale/AllSale';
import InvoiceS from './pages/sale/Invoice';
import PrintS from './pages/sale/Print';



function App() {

  useFirstLoad();

  return (
    <>
      <Routes>
	  
		<Route path='/' element={<Navigate to="/dashboard" />} />
        
        <Route path='/*' element={<IsLogOut />} >
          <Route path="logIn" element={ <LogIn />} />
        </Route>


        <Route path='/*' element={<IsLogIn />} >

          <Route path="dashboard" element={ <Home />} /> 

          <Route path="category/add" element={ <AddCategory />} />
          <Route path="category" element={ <AllCategory />} />
          <Route path="category/edit/:id" element={ <EditCategory />} />

          <Route path="subCategory" element={ <AllSubCategory />} />
          <Route path="subCategory/add" element={ <AddSubCategory />} />
          <Route path="subCategory/edit/:id" element={ <EditSubCategory />} />

          <Route path="product" element={ <AllProduct />} />
          <Route path="product/:id" element={ <ViewPorduct />} />
          <Route path="product/add" element={ <AddProduct />} />
          <Route path="product/edit/:id" element={ <EditProduct />} />

          <Route path="supplier" element={ <AllSupplier />} />
          <Route path="supplier/:id" element={ <ViewSupplier />} />
          <Route path="supplier/add" element={ <AddSupplier />} />
          <Route path="supplier/edit/:id" element={ <EdiSupplier />} />
          <Route path="supplier/return" element={ <SupplierReturnReport />} />
          <Route path="supplier/return/:id" element={ <SupplierReturn />} />
          <Route path="supplier/return/invoice/:id" element={ <InvoiceSI />} />
          <Route path="supplier/return/print/:id" element={ <PrintSI />} />
          <Route path="supplier/due" element={ <SupplierDueReport />} />
          <Route path="supplier/due/return:id" element={ <SupplierDue />} />
          <Route path="supplier/due/:id" element={ <SupplierDue />} />
          <Route path="supplier/due/invoice/:id" element={ <InvoiceSD />} />
          <Route path="supplier/due/print/:id" element={ <PrintSD />} />

          <Route path="customer" element={ <AllCustomer />} />
          <Route path="customer/:id" element={ <ViewCustomer />} />
          <Route path="customer/add" element={ <AddCustomer />} />
          <Route path="customer/edit/:id" element={ <EdiCustomer />} />
          <Route path="customer/return" element={ <CustomerReturnReport />} />
          <Route path="customer/return/:id" element={ <CustomerReturn />} />
          <Route path="customer/return/invoice/:id" element={ <InvoiceCI />} />
          <Route path="customer/return/print/:id" element={ <PrintCI />} />
          <Route path="customer/due" element={ <CustomerDueReport />} />
          <Route path="customer/due/:id" element={ <CustomerDue />} />
          <Route path="customer/due/invoice/:id" element={ <InvoiceCD />} />
          <Route path="customer/due/print/:id" element={ <PrintCD />} />

          <Route path="purchase" element={ <AllPurchase />} />
          <Route path="purchase/add" element={ <PurchaseProduct />} />
          <Route path="purchase/Invoice/:id" element={ <Invoice />} />
          <Route path="purchase/print/:id" element={ <Print />} />

          <Route path="sale" element={ <AllSale />} />
          <Route path="sale/add" element={ <SaleProduct />} />
          <Route path="sale/Invoice/:id" element={ <InvoiceS />} />
          <Route path="sale/print/:id" element={ <PrintS />} />
        </Route>




        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;