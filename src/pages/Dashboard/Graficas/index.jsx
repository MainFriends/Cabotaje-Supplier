import Card from "../../../components/ChartJS/Card";
import SalesCard from "../../../components/ChartJS/SalesCard";
import PurchaseCard from "../../../components/ChartJS/PurchaseCard";
import CardOrder from "../../../components/ChartJS/CardOrder";
import SalesDayCard from "../../../components/ChartJS/SalesDayCard";
import PieChartCategory from "../../../components/ChartJS/PieChartCategory";
import DoughnutChartEmployee from "../../../components/ChartJS/DoughnutChartEmployee";
import PolarAreaSupplier from "../../../components/ChartJS/PolarAreaSupplier";
import VerticalBarChart from "../../../components/ChartJS/VerticalBarChart";
import DoughnutChartDecrease from "../../../components/ChartJS/DoughnutChartDecrease";

const Graphics = () => {
    
    return (
    <div>
        <div className='row'>
          <SalesCard />
          <PurchaseCard />
          <CardOrder />
          <SalesDayCard />
        </div>
        <div className='row'>
          <div className="col-4">
            <Card 
          titulo='Ventas por categoria de producto'
          component={<PieChartCategory />}
            />  
          </div>
          <div className="col-4">
            <Card 
          titulo='Ventas por empleado'
          component={<DoughnutChartEmployee />}
            />  
          </div>
          <div className="col-4">
            <Card 
          titulo='Compras a proveedores'
          component={<PolarAreaSupplier />}
            />  
          </div>
     </div>

     <div className='row'>
     <div className="col-8 py-5">
            <Card 
          titulo='Compras de la semana - detalladas'
          component={<VerticalBarChart />}
            />  
          </div>
          <div className="col-4 py-5">
            <Card 
          titulo='Productos que más mermas'
          component={<DoughnutChartDecrease />}
            />  
          </div>
     </div>
    </div>
    )
}



export default Graphics; 