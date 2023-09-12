import React, { useState } from "react";
import Switch from "react-switch";
import { Table, Col, Row, Container } from "react-bootstrap";
import "./subbox.css";
// import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Subscription = () => {
  const [check, setCheck] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [selectedColumnData, setSelectedColumnData] = useState({});

  const year = [
    {
      type: "Mobile",
      Price: "1000",
      Video: "Good",
      Resolution: "480p",
      devices: ["Phone", "Tablet"],
    },
    {
      type: "Basic",
      Price: "2000",
      Video: "Good",
      Resolution: "480p",
      devices: ["Phone", "Tablet", "Computer", "TV"],
    },
    {
      type: "Standard",
      Price: "5000",
      Video: "Better",
      Resolution: "1080p",
      devices: ["Phone", "Tablet", "Computer", "TV"],
    },
    {
      type: "Premium",
      Price: "7000",
      Video: "4K+HDR",
      Resolution: "1080p",
      devices: ["Phone", "Tablet", "Computer", "TV"],
    },
  ];
  const month = [
    {
      type: "Mobile",
      Price: "100",
      Video: "Good",
      Resolution: "480p",
      devices: ["Phone", "Tablet"],
    },
    {
      type: "Basic",
      Price: "200",
      Video: "Good",
      Resolution: "480p",
      devices: ["Phone", "Tablet", "Computer", "TV"],
    },
    {
      type: "Standard",
      Price: "500",
      Video: "Better",
      Resolution: "1080p",
      devices: ["Phone", "Tablet", "Computer", "TV"],
    },
    {
      type: "Premium",
      Price: "700",
      Video: "4K+HDR",
      Resolution: "1080p",
      devices: ["Phone", "Tablet", "Computer", "TV"],
    },
  ];

  const handleChange = () => {
    setCheck(!check);
  };
  const handleColumnHover = (columnIndex) => {
    setHoveredColumn(columnIndex);
    const data = check ? month : year;
    const selectedData = data[columnIndex];
    setSelectedColumnData(selectedData);
    console.log(selectedColumnData);
  };

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Table hover responsive>
            <thead>
              <tr>
                <th>
                  <Switch
                    width={200}
                    height={70}
                    handleDiameter={50}
                    onColor="#00008b"
                    offColor="#00008b"
                    onChange={handleChange}
                    checked={check}
                    borderRadius={40}
                  />
                </th>
                <th
                  onClick={() => handleColumnHover(0)}
                  className={hoveredColumn === 0 ? "hovered" : ""}
                >
                  Mobile
                </th>
                <th
                  onClick={() => handleColumnHover(1)}
                  className={hoveredColumn === 1 ? "hovered" : ""}
                >
                  Basic
                </th>
                <th
                  onClick={() => handleColumnHover(2)}
                  className={hoveredColumn === 2 ? "hovered" : ""}
                >
                  Standard
                </th>
                <th
                  onClick={() => handleColumnHover(3)}
                  className={hoveredColumn === 3 ? "hovered" : ""}
                >
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              <td>
                <tr>{check ? "Monthly" : "Yearly"} Price</tr>
                <tr>Video Quality</tr>
                <tr>Resolution</tr>
                <tr>Devices you can use to watch</tr>
              </td>
              {check && (
                <>
                  {month.map((data) => (
                    <td>
                      <tr>{data.Price}</tr>
                      <tr>{data.Video}</tr>
                      <tr>{data.Resolution}</tr>
                      {data.devices.map((device) => (
                        <tr>{device}</tr>
                      ))}
                    </td>
                  ))}
                </>
              )}
              {!check && (
                <>
                  {year.map((data) => (
                    <td>
                      <tr>{data.Price}</tr>
                      <tr>{data.Video}</tr>
                      <tr>{data.Resolution}</tr>
                      {data.devices.map((device) => (
                        <tr>{device}</tr>
                      ))}
                    </td>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </Col>
        <LinkContainer to="/checkout">
          <span>NEXT</span>
        </LinkContainer>
      </Row>
    </Container>
  );
};

export default Subscription;
