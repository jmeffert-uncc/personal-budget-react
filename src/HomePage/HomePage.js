import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as d3 from 'd3';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const [chartData, setChartData] = useState({
    datasets: [{
      data: [12, 20, 30],
      backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb'],
    }],
    labels: ['Eat out', 'Rent', 'Groceries']
  });

  const d3Container = useRef(null);

  const createD3Chart = (data) => {
    // Clear previous chart
    d3.select(d3Container.current).html("");

    const width = 350;
    const height = 400;
    const margin = 80;
    const radius = Math.min(width - margin * 2, height - margin * 2) / 2;

    const svg = d3.select(d3Container.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.budget);

    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // Draw the chart
    const slice = svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.title));

    // Add labels
    const text = svg.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", d => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * (d.startAngle + (d.endAngle - d.startAngle)/2 < Math.PI ? 1.2 : -1.2);
        return `translate(${pos})`;
      })
      .attr("dy", ".35em")
      .style("text-anchor", d => 
        (d.startAngle + (d.endAngle - d.startAngle)/2 < Math.PI ? "start" : "end")
      )
      .text(d => d.data.title);
  };

  useEffect(() => {
    const getBudget = async () => {
      try {
        const response = await axios.get('http://localhost:3005/budget');
        const budgetData = response.data.myBudget;
        
        // Update Chart.js data
        setChartData({
          datasets: [{
            data: budgetData.map(item => item.budget),
            backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#98abc5', '#8a89a6', '#7b6888', '#6b486b'],
          }],
          labels: budgetData.map(item => item.title)
        });

        // Update D3 chart
        createD3Chart(budgetData);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    getBudget();
  }, []);

  return (
    <div className="HomePage">
    
    
    <section className="container center">
        <div className="page-area">
            
            <article className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            
            <div className="charts-container">
                <div className="text-box chart-box">
                    <h1>Chart.js</h1>
                    <div style={{ width: '400px', height: '400px' }}>
                        <Pie data={chartData} />
                    </div>
                </div>

                <div className="text-box chart-box">
                    <h1>D3.js</h1>
                    <div 
                        ref={d3Container}
                        style={{
                            width: '100%',
                            height: '400px'
                        }}
                    />
                </div>
            </div>

            <article className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article className="text-box">
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
        </div>
    </section>
</div>
  );
}

export default HomePage;
