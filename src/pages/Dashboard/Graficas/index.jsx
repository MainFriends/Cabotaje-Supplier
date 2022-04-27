import Card from "../../../components/ChartJS/Card";
import PieChartCategory from "../../../components/ChartJS/PieChartCategory";
import DoughnutChartEmployee from "../../../components/ChartJS/DoughnutChartEmployee";
import PolarAreaSupplier from "../../../components/ChartJS/PolarAreaSupplier";
import VerticalBarChart from "../../../components/ChartJS/VerticalBarChart";
import DoughnutChartDecrease from "../../../components/ChartJS/DoughnutChartDecrease";

const Graphics = () => {
    
    return (
    <div>
        <div className='row'>
          <div className="col-4">
            <Card 
          titulo='Ventas por categoria de producto'
          component={<PieChartCategory />}
            />  
          </div>
          <div className="col-4">
            <Card 
          titulo='Usuarios con más ventas'
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
          titulo='Productos mermados'
          component={<DoughnutChartDecrease />}
            />  
          </div>
     </div>
    </div>
    )
}



export default Graphics; 