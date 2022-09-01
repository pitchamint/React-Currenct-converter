import { useEffect, useState } from 'react';
import CurrencyComponent from './component/CurrencyComponent';
import money from './img/money.png'

function App() { 
  //สร้าง state เพื่อเก็บตัวเลือก โดยเก็บตัวเลือกไว้ที่ currency choice ทำให้สามารถส่งไป props ได้ 
  const [currencyChoice,setCurrencyChoice] = useState([])
  //เราต้องการใส่ค่าเริ่มต้นของสกุลเงินเมื่อรีโหลดมาหน้าแรก ในตัวสกุลเงินต้นทางเรากำหนดตาม url
  const [fromCurrency,setFromCurrency] = useState("USD")
  const [toCurrency,setToCurrency] = useState("THB")
  //สร้าง state เพื่อดึงเอาค่าเงินมาใช้ เฉพาะ exchangerate เพราะ amount มาจากที่ผู้ใช้กรอก
  const [amount,setAmount] = useState(1)
  const [exChangeRate,setExchangerate] = useState(0)
  //สร้าง state/ตัวแปร เพื่อเก็บข้อมูลที่ผู้ใช้กรอก
  const [checkFromCurrency,setCheckFromCurrency] =useState (true) //กำหนดเป็น true เพื่อให้ผู้ใช้กรอกสกุลเงินต้นทางก่อนในตอนเริ่มต้น

  let fromAmount,toAmount
  //เช็คว่าผู้ใช้กรอกข้อมูลมาจากฝั่งไหน to หรือ from แล้วนำเอามาคำนวณ เนื่องจากเราจะทำการคำนวน 2 ทางคือ จาก from->to // to->from
  if(checkFromCurrency){
    fromAmount = amount
    toAmount = (amount*exChangeRate).toFixed(2)
  }else{
    toAmount = amount
    fromAmount = (amount/exChangeRate).toFixed(2)
  }

  //ร้องขอ API
  useEffect(()=>{
    const url =`https://api.exchangerate-api.com/v4/latest/${fromCurrency}` //เราตั้งค่าเป็น ${fromCurrenc} เนื่องจากเราจะได้ ดึง rate เงินมาใช้ได้
    //ดึงข้อมูลไปจาก API โดยเปลี่ยนข้อมูลจาก Promise ไปเป็น Json
    fetch(url).then(res=>res.json())
    .then(data =>{
      setCurrencyChoice([...Object.keys(data.rates)]) //เอามาเฉพาะส่วนของชื่อสกุลเงิน (Key)
      setExchangerate(data.rates[toCurrency]) //เราต้องการนำค่าเงินมาเก็บที่ state exchangeRate
    })
  },[fromCurrency,toCurrency]) //ตอนแรกก็งงว่าตอนทำเครื่องดังมาก แต่พอใส่ [] แปลว่ามันจะทำการ fetch มาแค่ครั้งเดียว ซึ่งตอนแรก มันทำการโหลดเต็ม 100%
  //กำหนด [fromCurrency] เพื่อบอกว่าจะทำการดึงค่าเมื่อมีการเปลี่ยนแปลงค่าใน from 

  //สร้างฟังก์ชั่นเพื่อรับค่าตัวเลขที่ผู้ใช้กรอกมา เพราะในตอนแรกหลังจากที่เราคำนวณมาเรากดเปลี่ยนแปลงตัวเลขในช่อง อินพุต ไม่ได้
  const amountFromCurrency = (e) =>{
    setAmount(e.target.value)
    setCheckFromCurrency(true) //เพื่อบอกว่าค่าที่พิมพ์มาเป็นจำนวนเงินต้นทาง
  }

  const amountToCurrency = (e) =>{
    setAmount(e.target.value)
    setCheckFromCurrency(false) //เพื่อบอกว่าค่าที่พิมพ์มาเป็นจำนวนเงินปลายทาง
  }

  return (
    <div>
      <img src={money} alt="logo" className="money-img"/>
      <h1>Currency Converter</h1>
      <div className="container">
        <p>From</p>
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={fromCurrency}
          // เพื่อที่จะกดตัวเลือกให้เลือกสกุลเงินต่างๆได้ เราต้องกำหนดอีเว้นขึ้นมา กำหนด onchange ใน Componentก่อน และsetค่าที่เปลี่ยนทั้ง Toและ From
          changeCurrency={(e)=>setFromCurrency(e.target.value)}
          amount = {fromAmount} 
          onChangeAmount = {amountFromCurrency}
        /> 
        {/* propsข้อมูลส่งไปที่ currency component */}
        <div className="equal"> = </div>
        <p>To</p>
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={toCurrency}
          changeCurrency={(e)=>setToCurrency(e.target.value)} 
          amount = {toAmount} 
          onChangeAmount = {amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
