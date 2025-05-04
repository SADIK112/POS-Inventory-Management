import React, { useState } from "react";
import {
  Input,
  Text,
  Container,
  HeadingTwo,
  GridWrapper,
  FlexWrapper,
  Button,
  Select,
} from "../../common/commonStyle.js";
import { ArrowDownIcon } from "../../../assets/index.js";

const productStatus = ["ACTIVE", "ARCHIVED", "DRAFT"];

const ProductUpdateModal = ({ product, handleSubmit }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [status, setStatus] = useState(product.status);
  const [productType, setProductType] = useState(product.product_type);
  const [vendor, setVendor] = useState(product.vendor);

  const submit = () => {
    const payload = {
      id: product.id,
      title,
      status,
      productType,
      vendor,
      descriptionHtml: description,
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
            <Text htmlFor="title">Title:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="lastName">Description:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>

        <FlexWrapper alignItems={"center"} justifyContent={"space-between"}>
          <GridWrapper gap={1}>
            <Text htmlFor="status">Status:</Text>
            <Select
              id="product-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              imageUrl={ArrowDownIcon}
            >
              {productStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </GridWrapper>
          <GridWrapper gap={1}>
            <Text htmlFor="phone">Product Type:</Text>
            <Input
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={1}
              paddingRight={2}
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </GridWrapper>
        </FlexWrapper>

        <GridWrapper gap={1}>
          <Text htmlFor="title">Vendor:</Text>
          <Input
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={1}
            paddingRight={2}
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </GridWrapper>
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

export default ProductUpdateModal;
