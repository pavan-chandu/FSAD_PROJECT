import { useEffect, useState } from "react";

function AdminReports() {
  const [report, setReport] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
  });

  useEffect(() => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    const total = donations.length;
    const pending = donations.filter(d => d.status === "Pending").length;
    const approved = donations.filter(d => d.status === "Approved").length;
    const delivered = donations.filter(d => d.status === "Delivered").length;

    setReport({ total, pending, approved, delivered });
  }, []);

  return (
    <div className="container mt-4">
      <h3>Reports & Transparency</h3>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Total</h5>
            <h3>{report.total}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Pending</h5>
            <h3>{report.pending}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Approved</h5>
            <h3>{report.approved}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Delivered</h5>
            <h3>{report.delivered}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;