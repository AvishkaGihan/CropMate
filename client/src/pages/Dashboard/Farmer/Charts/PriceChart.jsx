import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Loader2 } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PriceChart = ({ data, isLoading, currencySymbol = "LKR" }) => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 10,
                    usePointStyle: true,
                },
            },
            tooltip: {
                intersect: false,
                mode: 'index',
                callbacks: {
                    label: function (context) {
                        return `${currencySymbol} ${context.parsed.y}`;
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    drawBorder: false,
                    color: 'rgba(107, 114, 128, 0.1)',
                },
                ticks: {
                    callback: function (value) {
                        return `${currencySymbol} ${value}`;
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 7,
                }
            }
        },
        interaction: {
            intersect: false,
        },
        elements: {
            line: {
                tension: 0.3
            },
            point: {
                radius: 0,
                hitRadius: 5,
                hoverRadius: 5
            }
        }
    };

    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: `Price (${currencySymbol}/kg)`,
                data: data.map(d => d.price),
                borderColor: 'rgb(22, 163, 74)',
                backgroundColor: 'rgba(22, 163, 74, 0.2)',
                fill: true,
            }
        ]
    };

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 size={32} className="text-green-600 animate-spin" />
            </div>
        );
    }

    return <Line options={chartOptions} data={chartData} />;
};

export default PriceChart;