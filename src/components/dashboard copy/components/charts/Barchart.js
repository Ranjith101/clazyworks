import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = () => {
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <>
            <div className="container-sm">
                <h2>Bar Chart</h2>
                <Bar
                    data={barChartData}
                    options={{
                        scales: {
                            x: {
                                type: 'category', // Use category scale for x-axis
                                beginAtZero: true,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </>
    )
}
export default Barchart;


