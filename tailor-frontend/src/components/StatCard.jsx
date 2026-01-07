import { FiUsers } from "react-icons/fi";
import { FaRuler } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineAccessTime } from "react-icons/md";

export default function StatCard({ image, alt, style }) {
    return (
        
        <div
            style={{
                position: "relative",
                borderRadius: "26px",
                overflow: "hidden",
                transition: "all .35s ease",
                // flexShrink: 0,
                // opacity: 0.78,
                boxShadow: `
                  0 10px 28px rgba(0,0,0,.18),
                  0 6px 13px rgba(0,0,0,.12)
                `,
                ...style
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `
                  0 10px 18px rgba(0,0,0,.25),
                  0 6px 12px rgba(0,0,0,.18)
                `;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `
                  0 6px 18px rgba(0,0,0,.18),
                  0 2px 6px rgba(0,0,0,.12)
                `;
            }}
        >
            <img
                src={image}
                alt={alt}
                style={{ width: "100%", display: "block" }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    padding: "18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    pointerEvents: "none",
                    color: "#111111dd",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.3px"
                }}
            >

                <div style={{
                    fontSize: "26px", marginBottom: "6px",
                    backgroundColor: "#ffffff3b",
                    // padding: "7px 0px 0px 9px",
                    padding: "7px 9px 0px 9px",
                    color: "#0000009c",
                    borderRadius: "13px",
                    marginTop: "3px",
                    width: "fit-content",
                }}>
                    {alt === "Total Customers" && <FiUsers />}
                    {alt === "Total Measurements" && <FaRuler />}
                    {alt === "Total Admins" && <AiOutlineUser />}
                    {alt === "Today's Activity" && <MdOutlineAccessTime />}
                </div>

                <div style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1 }}>
                    {alt === "Total Customers" && "2,547"}
                    {alt === "Total Measurements" && "5,123"}
                    {alt === "Total Admins" && "18"}
                    {alt === "Today's Activity" && "215"}
                </div>

                <div style={{ fontSize: "14px", marginTop: "4px" }}>{alt}</div>
            </div>
        </div>

    );
}
