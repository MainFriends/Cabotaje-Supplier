import React, {useState, useEffect} from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font, Svg } from '@react-pdf/renderer';
import axios from '../config/axios';
import token from '../helpers/getToken';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  subtext: {
    margin: 12,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Times-Roman' 
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const SaleInvoicePDF = ({saleInvoice,productListSale}) => {
    const [companyData, setCompanyData] = useState({
        COMPANY_NAM: '',
        COMPANY_ADDRESS: '',
        COMPANY_EMAIL: '',
        COMPANY_RTN: '',
        COMPANY_PHONE: '',
        COMPANY_LOCATION: '',
        COMPANY_FACEBOOK: '',
        COMPANY_INSTAGRAM: '',
        COMPANY_WHATSAPP: '',
        USER_LAST_UPDATE: '',
    });

    useEffect(() => {
        axios.get('/company-information', token())
        .then(res => setCompanyData(res.data[0]))
    }, [])
    let coors = 200;
    const nombreCliente = `Cliente: ${saleInvoice.NAM_CLIENT}`;
    const email = `Correo: ${companyData.COMPANY_EMAIL}`;
    
  return (
    <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>CABOTAJE S. DE R.L.</Text>
      <Svg viewBox="0 0 560 700">
      <Text x="110" y="10"style={styles.text}>{companyData.COMPANY_ADDRESS.toUpperCase()}</Text>
      <Text x="145" y="25" style={styles.text}>AUTORREPUESTOS JIRETH CEL: 96615148</Text>
      <Text x="170" y="40" style={styles.text}>{email}</Text>
      <Text x="215" y="55" style={styles.text}>RTN: 0801123621459</Text>
      <Text x="230" y="90" style={styles.text}>CAI: 1524-1524-1258-3698-1452-1458-1236-8965-1458</Text>
      <Text x="60"  y="120" style={styles.subtitle}>FACTURA</Text>
      <Text x="1" y="140" style={styles.subtitle}>N° 000-001-01-000000006</Text>
      <Text x="380" y="110" style={styles.text}>CONTADO</Text>
      <Text x="470" y="110" style={styles.text}>CREDITO</Text>
      <Text x="410" y="127" style={styles.text}>Dia</Text>
      <Text x="450" y="127" style={styles.text}>Mes</Text>
      <Text x="490" y="127" style={styles.text}>Año</Text>
      <Text x="414" y="140" style={styles.text}>26</Text>
      <Text x="454" y="140" style={styles.text}>07</Text>
      <Text x="490" y="140" style={styles.text}>2022</Text>
      <Text x="1" y="160" style={styles.text}>{nombreCliente}</Text>
      <Text x="1" y="185" style={styles.text}>Direccion:</Text>
      <Text x="320" y="185" style={styles.text}>R.T.N:</Text>
      <Text x="1" y="210" style={styles.text}>CANT.</Text>
      <Text x="135" y="210" style={styles.text}>DESCRIPCION</Text>
      <Text x="290" y="210" style={styles.text}>PRECIO UNIT.</Text>
      <Text x="400" y="210" style={styles.text}>DESCUENTOS</Text>
      <Text x="510" y="210" style={styles.text}>TOTAL</Text>
      {productListSale.map(row => {
            coors = coors + 30;
            return <>
            <Text x="5" y={coors} style={styles.text}>{row.CANT_PRODUCTS}</Text>
            <Text x="135" y={coors} style={styles.text}>{row.DES_PRODUCT}</Text>
            </>
      })}
      <Text x="365" y={coors > 510 ? coors + 50 : 510} style={styles.text}>Importe Exonerado L.</Text>
      <Text x="387" y={coors + 90} style={styles.text}>Importe Exento L.</Text>
      <Text x="350" y={coors + 110} style={styles.text}>Importe Gravado 18% L.</Text>
      <Text x="350" y={coors + 130} style={styles.text}>Importe Gravado 15% L.</Text>
      <Text x="415" y={coors + 150} style={styles.text}>I.S.V. 18% L.</Text>
      <Text x="415" y={coors + 170} style={styles.text}>I.S.V. 15% L.</Text>
      <Text x="370" y={coors + 190} style={styles.text}>TOTAL A PAGAR L. 200452.61</Text>
      <Text x="250" y={coors + 190} style={styles.text}>(Cantidad en letras)</Text>
      <Text x="1" y={coors + 50} style={styles.text}>La factura es beneficio de todos "Exijala"</Text>
      <Text x="300" y={coors + 50} style={styles.text}>TOTAL L.</Text>
      <Text x="1" y={coors + 70}  style={styles.subtext}>DATOS DEL ADQUERIENTE EXONERADO</Text>
      <Text x="1" y={coors + 90} style={styles.subtext}>No. Orden de Compra Exenta:</Text>
      <Text x="1" y={coors + 110} style={styles.subtext}>No. Constancia de Registro de Exoneraciones:</Text>
      <Text x="1" y={coors + 130} style={styles.subtext}>No. Registros de la SAG:</Text>
      <Text x="1" y={coors + 150} style={styles.subtext}>Original: Cliente, 1ra, Copia: Obligado Tributario Emisor</Text>
      <Text x="1" y={coors + 170} style={styles.subtext}>Fecha Limte de de emision: 03/01/2023</Text>        
      <Text x="1" y={coors + 190} style={styles.subtext}>Rango Autorizado: 000-001-01-00000001 al 000-001-0000000100</Text>
      </Svg> 
      
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
  )
}

export default SaleInvoicePDF