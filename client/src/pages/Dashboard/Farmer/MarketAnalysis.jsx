import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    TrendingUp,
    ChevronsUpDown,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Info
} from 'lucide-react';
import { FormSelect } from '../../../components/Shared/FormSelect';
import PriceChart from './Charts/PriceChart';


const MarketAnalysis = () => {
    // Filter states
    const [cropType, setCropType] = useState('all');
    const [timeRange, setTimeRange] = useState('30d');
    const [region, setRegion] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - would be replaced with API calls
    const [marketData, setMarketData] = useState({});
    const [priceData, setPriceData] = useState([]);

    // Format number as LKR
    const formatCurrency = (value) => {
        return `LKR ${value}`;
    };

    // Fetch market data
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            // Mock data for demonstration
            setMarketData({
                averagePrice: formatCurrency('45.50'),
                priceChange: 3.2,
                highestPrice: formatCurrency('52.70'),
                lowestPrice: formatCurrency('40.10'),
                predictedTrend: 'increase',
                demandLevel: 'high',
                forecastData: generateForecastData(),
                topSellingCrops: ['Rice', 'Wheat', 'Tomatoes', 'Potatoes', 'Onions']
            });

            setPriceData(generatePriceData());
            setIsLoading(false);
        }, 1000);
    }, [cropType, timeRange, region]);

    // Generate mock price data
    const generatePriceData = () => {
        const data = [];
        const now = new Date();
        const daysToGenerate = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;

        for (let i = daysToGenerate; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);

            // Base price varies by crop type
            let basePrice = cropType === 'rice' ? 45 :
                cropType === 'wheat' ? 35 :
                    cropType === 'vegetables' ? 25 : 40;

            // Add randomness
            basePrice += (Math.random() * 10) - 5;

            // Trend upward slightly
            basePrice += (i / daysToGenerate) * 8;

            data.push({
                date: date.toISOString().split('T')[0],
                price: Math.max(10, basePrice.toFixed(2))
            });
        }

        return data;
    };

    // Generate mock forecast data
    const generateForecastData = () => {
        const data = [];
        const now = new Date();

        for (let i = 1; i <= 6; i++) {
            const date = new Date(now);
            date.setMonth(date.getMonth() + i);

            let basePrice = 45 + (i * 2) + (Math.random() * 8 - 4);

            data.push({
                month: date.toLocaleString('default', { month: 'short' }),
                predicted: basePrice.toFixed(2),
                actual: i <= 2 ? (basePrice - 1 + (Math.random() * 2)).toFixed(2) : null
            });
        }

        return data;
    };

    console.log(marketData)
    return (
        <div className="min-h-screen space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Market Analysis</h1>
                    <p className="text-gray-600 mt-1">Track prices, trends, and make data-driven decisions</p>
                </div>
            </div>

            {/* Filters section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        {/* Crop type filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                            <FormSelect
                                value={cropType}
                                onChange={(e) => setCropType(e.target.value)}
                                options={[
                                    { value: 'all', label: 'All Crops' },
                                    { value: 'rice', label: 'Rice' },
                                    { value: 'wheat', label: 'Wheat' },
                                    { value: 'vegetables', label: 'Vegetables' },
                                    { value: 'pulses', label: 'Pulses' },
                                    { value: 'spices', label: 'Spices' }
                                ]}
                            />
                        </div>

                        {/* Time range filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                            <FormSelect
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                options={[
                                    { value: '7d', label: 'Last 7 Days' },
                                    { value: '30d', label: 'Last 30 Days' },
                                    { value: '90d', label: 'Last 90 Days' }
                                ]}
                            />
                        </div>

                        {/* Region filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                            <FormSelect
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                options={[
                                    { value: 'all', label: 'All Regions' },
                                    { value: 'colombo', label: 'Colombo' },
                                    { value: 'kandy', label: 'Kandy' },
                                    { value: 'galle', label: 'Galle' },
                                    { value: 'jaffna', label: 'Jaffna' },
                                    { value: 'trincomalee', label: 'Trincomalee' }
                                ]}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                setTimeout(() => {
                                    setPriceData(generatePriceData());
                                    setIsLoading(false);
                                }, 500);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <RefreshCw size={16} className="mr-2" />
                            Refresh Data
                        </button>
                    </div>
                </div>
            </div>

            {/* Market summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Average Price</span>
                            <span className="text-2xl font-bold text-gray-900">{marketData.averagePrice}</span>
                            <span className={`text-sm flex items-center ${marketData.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {marketData.priceChange >= 0 ?
                                    <ArrowUpRight size={14} className="mr-1" /> :
                                    <ArrowDownRight size={14} className="mr-1" />}
                                {marketData.priceChange}% from previous period
                            </span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Price Range</span>
                            <span className="text-2xl font-bold text-gray-900">
                                {marketData.lowestPrice} - {marketData.highestPrice}
                            </span>
                            <span className="text-sm text-gray-500">
                                During {timeRange === '7d' ? 'past week' : timeRange === '30d' ? 'past month' : 'past 3 months'}
                            </span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <ChevronsUpDown size={24} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Predicted Trend</span>
                            <span className="text-2xl font-bold text-gray-900 capitalize">{marketData.predictedTrend}</span>
                            <span className="text-sm text-gray-500">Next 3 months forecast</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <BarChart3 size={24} className="text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Market Demand</span>
                            <span className="text-2xl font-bold text-gray-900 capitalize">{marketData.demandLevel}</span>
                            <span className="text-sm text-gray-500">Current buyer interest level</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <ShoppingBag size={24} className="text-amber-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Price chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Price Trends</h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <Info size={14} className="mr-1" />
                        <span>Based on market data from major agricultural exchanges</span>
                    </div>
                </div>
                <div className="h-80">
                    <PriceChart data={priceData} isLoading={isLoading} currencySymbol="LKR" />
                </div>
            </div>
        </div>
    );
};

export default MarketAnalysis;