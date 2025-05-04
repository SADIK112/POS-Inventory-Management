import React, { useState, useEffect } from "react";
import { ContentHeader } from "../index";
import {
  ArrowUpDownIcon,
  ActionIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "../../assets/index.js";
import { Text, CustomIcon, Button } from "../common/commonStyle.js";
import {
  TableContainer,
  Table,
  Header,
  TableHeader,
  HeaderText,
  HeaderButton,
  TableContent,
  Content,
  ContentText,
  ContentButton,
  LoadingWrapper,
  ContentWrapper,
  Footer,
  ActionMenu,
  PaginationAction,
} from "./ContentListStyle.js";
import { useAppQuery } from "../../hooks/useAppQuery.js";
import { getNumberVariantId } from "../Utils/index.js";
import Loading from "../common/Loading.jsx";
import { ProductFilter } from "./ProductFilter";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch.js";
import Modal from "../common/Modal.jsx";
import ProductUpdateModal from "./ProductUpdateModal/index.jsx";

const tableHeader = [
  { title: "id", sort: true, sortType: "ID" },
  { title: "Title", sort: true, sortType: "TITLE" },
  { title: "Type", sort: true, sortType: "PRODUCT_TYPE" },
  { title: "Vendor", sort: true, sortType: "VENDOR" },
  { title: "Status" },
  { title: "Stock" },
  { title: "Price" },
  { title: "Action" },
];

const formatProductsDataForTable = (products) => {
  return products.map((product) => {
    return {
      id: getNumberVariantId(product.id),
      title: product?.title,
      product_type: product?.productType,
      description: product?.description,
      status: product?.status,
      vendor: product?.vendor,
      stock: product?.totalInventory,
      price: +product.priceRangeV2?.maxVariantPrice?.amount || 0,
      image: product.images?.nodes[0]?.originalSrc,
    };
  });
};

export function ProductList() {
  const fetch = useAuthenticatedFetch();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [sortBy, setSortBy] = useState("TITLE");
  const [editProduct, setEditProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [pagination, setPagination] = useState({
    endCursor: "",
    perPage: 10,
    searchQuery: "",
    sortBy: sortBy,
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: "",
  });

  const { data, isLoading, refetch } = useAppQuery({
    url: `/api/products/lookup?perPage=${pagination.perPage}&startCursor=${pagination.startCursor}&endCursor=${pagination.endCursor}&searchQuery=${pagination.searchQuery}&sortBy=${pagination.sortBy}&searchType=${searchType}&status=${selectedStatus}`,
    reactQueryOptions: {
      enabled: shouldRefetch,
      staleTime: 0,
      cacheTime: 0,
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      setShouldRefetch(false);
      setTotalProducts(data.countProducts);
      setProducts(formatProductsDataForTable(data.products));
      setPagination((prevPagination) => ({
        ...prevPagination,
        endCursor: data?.pageInfo?.endCursor || "",
        hasNextPage: data?.pageInfo?.hasNextPage,
        hasPreviousPage: data?.pageInfo?.hasPreviousPage,
        startCursor: data?.pageInfo?.startCursor || "",
      }));
    }
  }, [data, isLoading]);

  const updatePagination = (type) => {
    setShouldRefetch(true);
    switch (type) {
      case "next":
        setPagination((prevPagination) => ({
          ...prevPagination,
          endCursor: prevPagination.endCursor,
          startCursor: "",
        }));
        break;
      case "prev":
        setPagination((prevPagination) => ({
          ...prevPagination,
          endCursor: "",
          startCursor: prevPagination.startCursor,
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setShouldRefetch(true);
    setPagination((prevPagination) => ({
      ...prevPagination,
      endCursor: "",
      startCursor: "",
      sortBy,
      searchQuery,
    }));
  }, [searchQuery, selectedStatus, sortBy]);

  const handleAction = (index) => {
    const updatedProducts = products.map((product, i) => ({
      ...product,
      triggerAction: i === index ? !product.triggerAction : false,
    }));

    setProducts(updatedProducts);
  };

  const onDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        Accept: "application/json",
        "Content-Type": "application/json",
      });

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      const result = await response.json();
      setShouldRefetch(true);
      refetch();

      console.log("deleteProduct", result);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const onSubmitEditRequest = async (product) => {
    try {
      const response = await fetch(`/api/products/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      if (!response.ok) {
        throw new Error("Error updating product");
      }

      const result = await response.json();

      setShouldRefetch(true);
      refetch();
      setIsEditModalOpen(false);
      setEditProduct(null);

      console.log("updateProduct", result);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const onEditProduct = (product) => {
    setIsEditModalOpen(true);
    setEditProduct(product);
  };

  const handleModalClose = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setIsModalClosing(false);
    }, 200);
    setEditProduct(null);
  };

  return (
    <>
      <ContentHeader
        title="Products"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchType={setSearchType}
        defaultSearchType={searchType}
      >
        <ProductFilter
          selectedStatus={selectedStatus}
          selectedVendor={selectedVendor}
          setSearchType={setSearchType}
          setSelectedStatus={setSelectedStatus}
          setSelectedVendor={setSelectedVendor}
          setSearchQuery={setSearchQuery}
        />
      </ContentHeader>
      <TableContainer>
        <Table>
          <TableHeader
            gridTemplateColumns={"1.25fr 3fr 1.5fr 2fr 1fr 1fr 1fr 1fr auto"}
          >
            {tableHeader.map((header, index) => (
              <Header key={index}>
                <HeaderText>{header.title}</HeaderText>
                {header.sort && (
                  <HeaderButton onClick={() => setSortBy(header.sortType)}>
                    <CustomIcon
                      width={"20px"}
                      height={"20px"}
                      src={ArrowUpDownIcon}
                      alt="Arrow Up Down"
                    />
                  </HeaderButton>
                )}
              </Header>
            ))}
          </TableHeader>
          {isLoading ? (
            <LoadingWrapper>
              <Loading width={150} height={150} />
            </LoadingWrapper>
          ) : (
            <TableContent>
              {products.map((content, index) => (
                <ContentWrapper
                  key={index}
                  gridTemplateColumns={
                    "1.25fr 3fr 1.5fr 2fr 1fr 1fr 1fr 1fr auto"
                  }
                >
                  <Text color="#fff">{content.id}</Text>
                  <Content
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <CustomIcon
                      width={"20px"}
                      height={"20px"}
                      src={content.image}
                      alt="Product Image"
                    />
                    <Text color="#fff">{content.title}</Text>
                  </Content>
                  <Text color="#fff">{content.product_type}</Text>
                  <Text color="#fff">{content.vendor}</Text>
                  <ContentText
                    className={
                      content.status.toLowerCase() === "active"
                        ? "active"
                        : "disabled"
                    }
                    color="#fff"
                  >
                    {content.status.toLowerCase()}
                  </ContentText>
                  <Text color="#fff">{content.stock}</Text>
                  <Text color="#fff">{content.price}</Text>
                  <ContentButton onClick={() => handleAction(index)}>
                    <CustomIcon
                      width={"20px"}
                      height={"20px"}
                      src={ActionIcon}
                      alt="Action Icon"
                    />
                    <ActionMenu
                      width={100}
                      className={content.triggerAction && "active"}
                    >
                      <Button
                        padding={"10px"}
                        background={"transparent"}
                        color="#fff"
                        onClick={() => onDeleteProduct(content.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        padding={"10px"}
                        background={"transparent"}
                        color="#fff"
                        onClick={() => onEditProduct(content)}
                      >
                        Update
                      </Button>
                    </ActionMenu>
                  </ContentButton>
                </ContentWrapper>
              ))}
              <Footer>
                <PaginationAction>
                  <Button
                    background={"rgba(21, 30, 47, 1)"}
                    width={36}
                    height={36}
                    bproductRadius={2}
                    hoverBackground={"rgba(37, 154, 108, 1)"}
                    disabled={!pagination.hasPreviousPage}
                    onClick={() => updatePagination("prev")}
                  >
                    <CustomIcon src={ArrowLeftIcon} alt="Arrow Left Icon" />
                  </Button>
                  <Text color="#fff">
                    {products.length} products out of {totalProducts}
                  </Text>
                  <Button
                    background={"rgba(21, 30, 47, 1)"}
                    width={36}
                    height={36}
                    bproductRadius={2}
                    hoverBackground={"rgba(37, 154, 108, 1)"}
                    disabled={!pagination.hasNextPage}
                    onClick={() => updatePagination("next")}
                  >
                    <CustomIcon src={ArrowRightIcon} alt="Arrow Right Icon" />
                  </Button>
                </PaginationAction>
              </Footer>
            </TableContent>
          )}
        </Table>
      </TableContainer>
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        isClosing={isModalClosing}
        width={600}
      >
        <ProductUpdateModal
          product={editProduct}
          handleSubmit={onSubmitEditRequest}
        />
      </Modal>
    </>
  );
}
