import StatCard from "../components/StatCard";
import Chart from "../components/chart";

import customerCard from "../assets/total-customer-card.png";
import measurementCard from "../assets/total-maesurement.png";
import adminCard from "../assets/Total-admin-card.png";
import activityCard from "../assets/total-activity-card.png";

// hello i am darshil
export default function Dashboard() {
    return (

        <div style={{ padding: "4px 24px 24px 24px" }}>
            <div style={{ marginBottom: "22px" }}>
                <h1 style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    margin: 0,
                    color: "#6f5b3e",
                    fontFamily: "'Inter', sans-serif"
                }}>
                    Dashboard
                </h1>

                <p style={{
                    margin: "6px 0 0",
                    fontSize: "14px",
                    color: "#8b7a63",
                    fontFamily: "'Inter', sans-serif"
                }}>
                    Overview of your tailoring business
                </p>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "nowrap"
            }}>
                <StatCard image={customerCard} alt="Total Customers" style={{ width: "95%" }} />
                <StatCard image={measurementCard} alt="Total Measurements" style={{ width: "100%" }} />
                <StatCard image={adminCard} alt="Total Admins" style={{ width: "100%" }} />
                <StatCard image={activityCard} alt="Today's Activity" style={{ width: "102%" }} />
            </div>
            <div style={{ marginTop: "30px" }}>
                <Chart />
            </div>
        </div>
    );
}

