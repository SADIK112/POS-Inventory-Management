import React, { useState } from "react";
import {
  Input,
  Text,
  Container,
  HeadingTwo,
  GridWrapper,
  FlexWrapper,
  Button,
} from "../../common/commonStyle.js";

const CustomerUpdateModal = ({ customer, handleSubmit }) => {
  const [firstName, setFirstName] = useState(customer.firstname);
  const [lastName, setLastName] = useState(customer.lastname);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [address1, setAddress1] = useState(customer.address1);
  const [address2, setAddress2] = useState(customer.address2);
  const [city, setCity] = useState(customer.city);
  const [province, setProvince] = useState(customer.province);
  const [country, setCountry] = useState(customer.country);
  const [zip, setZip] = useState(customer.zip);

  const submit = () => {
    const payload = {
      id: customer.id,
      firstName,
      lastName,
      email,
      phone,
      addresses: {
        address1,
        address2,
        city,
        province,
        country,
        zip,
      },
    };
    handleSubmit(payload);
  };

  return (
    <Container>
      <HeadingTwo style={{ textAlign: "center" }}>Edit Information</HeadingTwo>
      <GridWrapper
        style={{
          marginTop: "2rem",
        }}
        gap={1}
      >
        <FlexWrapper alignItems={"center"} justifyContent={"space-between"}>
          <GridWrapper gap={1}>
            <Text htmlFor="firstName">First Name:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="lastName">Last Name:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>

        <FlexWrapper alignItems={"center"} justifyContent={"space-between"}>
          <GridWrapper gap={1}>
            <Text htmlFor="email">Email:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="phone">Phone:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>

        <FlexWrapper alignItems={"center"} justifyContent={"space-between"}>
          <GridWrapper gap={1}>
            <Text htmlFor="address1">Address Line 1:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="address2">Address Line 2:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>

        <FlexWrapper alignItems={"center"} justifyContent={"space-between"}>
          <GridWrapper gap={1}>
            <Text htmlFor="city">City:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="state">Province:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>
        <FlexWrapper alignItems={"center"} justifyContent={"space-between"}>
          <GridWrapper gap={1}>
            <Text htmlFor="country">Country:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="country">Postal Code:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>
      </GridWrapper>
      <Button
        marginTop={"1rem"}
        padding={"0.5rem 1rem"}
        borderRadius={5}
        hoverBackground={"rgba(29, 40, 60, 1)"}
        background="rgba(37, 154, 108, 1)"
        onClick={submit}
      >
        Save
      </Button>
    </Container>
  );
};

export default CustomerUpdateModal;
