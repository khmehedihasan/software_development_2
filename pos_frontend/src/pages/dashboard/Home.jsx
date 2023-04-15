import React from 'react' ;
import Layout from '../../components/Layout';
import PurchaseChart from './PurchaseChart';
import PReportPi from './PReportPi';
import SReportPi from './SReportPi';




function Home(){  

    return(
        <Layout>
          <div className=" w-full h-2/3">
            <PurchaseChart />
          </div>
          <div className=" p-10 mt-20 flex flex-col  md:flex-row gap-6 justify-evenly items-center">
            <div className=" w-60 h-60 mb-12 md:mb-0 relative scale-150 flex flex-col items-center">
            <div className=" w-1/2 -mb-6 text-center "> Purchase </div>
              <PReportPi />
              <div className=" w-1/2 -mt-10 flex flex-col justify-center items-start">
                <div><div className=" w-3 h-3 bg-blue-600 inline-block "></div> Payed</div>
                  <div><div className=" w-3 h-3 bg-red-500 inline-block"></div> Due</div>
              </div>
            </div>
            <div className=" w-60 h-60 mt-16 md:mt-0 relative scale-150 flex flex-col items-center ">
              <div className=" w-1/2 -mb-6 text-center "> Sale </div>
              <SReportPi />
              <div className=" w-1/2 -mt-10 flex flex-col justify-center items-start">
                <div><div className=" w-3 h-3 bg-blue-600 inline-block "></div> Received</div>
                  <div><div className=" w-3 h-3 bg-red-500 inline-block"></div> Due</div>
              </div>
            </div>
          </div>

        </Layout>
    )
}

export default Home;