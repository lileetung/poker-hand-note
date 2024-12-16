'use client'

import { useState } from 'react'
import Script from 'next/script'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')

  const handleNumber = (number: string) => {
    if (display === '0') {
      setDisplay(number)
    } else {
      setDisplay(display + number)
    }
  }

  const handleOperator = (operator: string) => {
    setEquation(display + ' ' + operator + ' ')
    setDisplay('0')
  }

  const handleEqual = () => {
    try {
      const result = eval(equation + display)
      setDisplay(result.toString())
      setEquation('')
    } catch (error) {
      setDisplay('Error')
      setEquation('')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <div className="text-right text-sm text-gray-500">{equation}</div>
            <Input 
              type="text" 
              value={display} 
              readOnly 
              className="text-right text-2xl w-full"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={handleClear} variant="outline" className="col-span-2">AC</Button>
            <Button onClick={() => handleOperator('/')} variant="outline">/</Button>
            <Button onClick={() => handleOperator('*')} variant="outline">×</Button>
            
            {[7, 8, 9].map((num) => (
              <Button key={num} onClick={() => handleNumber(num.toString())} variant="outline">
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperator('-')} variant="outline">-</Button>
            
            {[4, 5, 6].map((num) => (
              <Button key={num} onClick={() => handleNumber(num.toString())} variant="outline">
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperator('+')} variant="outline">+</Button>
            
            {[1, 2, 3].map((num) => (
              <Button key={num} onClick={() => handleNumber(num.toString())} variant="outline">
                {num}
              </Button>
            ))}
            <Button onClick={handleEqual} className="row-span-2">=</Button>
            
            <Button onClick={() => handleNumber('0')} variant="outline" className="col-span-2">0</Button>
            <Button onClick={() => handleNumber('.')} variant="outline">.</Button>
          </div>
        </div>
        
        {/* Google AdSense Ad */}
        <div className="p-4 border-t">
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=your-client-id"
            crossOrigin="anonymous"
          />
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="your-client-id"
            data-ad-slot="your-ad-slot"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <Script id="adsense-init">
            {`
              (adsbygoogle = window.adsbygoogle || []).push({});
            `}
          </Script>
        </div>
      </div>
    </div>
  )
}

