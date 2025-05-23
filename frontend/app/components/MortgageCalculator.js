'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export default function MortgageCalculator() {
  const [amount, setAmount] = useState(30000000); // Сумма кредита в тенге
  const [rate, setRate] = useState(12); // Процентная ставка
  const [term, setTerm] = useState(15); // Срок в годах
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [amount, rate, term]);

  const calculateMortgage = () => {
    if (amount <= 0 || rate <= 0 || term <= 0) return;

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    
    // Аннуитетный платеж
    const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                   (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const total = monthly * numberOfPayments;
    const over = total - amount;

    setMonthlyPayment(monthly);
    setTotalPayment(total);
    setOverpayment(over);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-accent mr-3" />
        <h3 className="text-lg font-bold text-primary-900">Ипотечный калькулятор</h3>
      </div>

      <div className="space-y-6">
        {/* Сумма кредита */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сумма кредита: {formatCurrency(amount)}
          </label>
          <input
            type="range"
            min="10000000"
            max="80000000"
            step="1000000"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10 млн ₸</span>
            <span>80 млн ₸</span>
          </div>
        </div>

        {/* Процентная ставка */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Процентная ставка: {rate}%
          </label>
          <input
            type="range"
            min="8"
            max="20"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Срок кредита */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Срок кредита: {term} лет
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={term}
            onChange={(e) => setTerm(parseInt(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 лет</span>
            <span>30 лет</span>
          </div>
        </div>

        {/* Результаты */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Результат расчёта
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
              <span className="text-gray-600">Ежемесячный платёж:</span>
              <span className="font-bold text-accent text-lg">
                {formatCurrency(monthlyPayment)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Общая сумма выплат:</span>
              <span className="font-semibold text-primary-900">
                {formatCurrency(totalPayment)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-gray-600">Переплата:</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(overpayment)}
              </span>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-semibold text-primary-900 mb-2">Первоначальный взнос</h5>
          <p className="text-sm text-gray-600 mb-2">
            Рекомендуемый первоначальный взнос: 20-30% от стоимости квартиры
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>20%:</span>
              <span className="font-medium">{formatCurrency(amount * 0.25)}</span>
            </div>
            <div className="flex justify-between">
              <span>30%:</span>
              <span className="font-medium">{formatCurrency(amount * 0.375)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-accent hover:bg-accent-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
          Получить консультацию по ипотеке
        </button>
      </div>
    </div>
  );
}