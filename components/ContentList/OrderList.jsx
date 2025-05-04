import React, { useState, useEffect } from "react";
import { ContentHeader } from "../index";
import {
  ArrowUpDownIcon,
  ActionIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
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
  ContentButton,
  ContentWrapper,
  Footer,
  ActionMenu,
  PaginationAction,
  LoadingWrapper,
} from "./ContentListStyle.js";
import { useAppQuery } from "../../hooks/useAppQuery.js";
import { getNumberVariantId } from "../Utils/index.js";
import Loading from "../common/Loading.jsx";
import {
  FilterMenuSelect,
  FilterButtonWrapper,
} from "./ProductFilter/ProductFilterStyle.js";

const tableHeader = [
  {
    title: "id",
    sort: true,
    sortType: "ID",
  },
  {
    title: "Name",
    sort: true,
    sortType: "ORDER_NUMBER",
  },
  {
    title: "Fulfillment Status",
    sort: true,
    sortType: "FULFILLMENT_STATUS",
  },
  {
    title: "Customer",
    sort: true,
    sortType: "CUSTOMER_NAME",
  },
  {
    title: "Total Price",
    sort: true,
    sortType: "TOTAL_PRICE",
  },
  {
    title: "Payment Status",
  },
  {
    title: "Created At",
  },
  {
    title: "Action",
  },
];

const searchWith = [
  { value: "email", label: "Email" },
  { value: "name", label: "Name" },
  { value: "tag", label: "Tag" },
  { value: "created_at", label: "Created At" },
];

const formatOrdersDataForTable = (orders) => {
  return orders.map((order) => {
    return {
      id: getNumberVariantId(order.id),
      order_name: order?.name,
      fullfillment_status: order?.fulfillable,
      customer: order?.customer?.displayName,
      total_spent: order?.totalPriceSet?.presentmentMoney?.amount,
      payment_status: order?.unpaid,
      created_at: order?.createdAt,
    };
  });
};

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [sortBy, setSortBy] = useState("CREATED_AT");
  const [pagination, setPagination] = useState({
    endCursor: "",
    perPage: 10,
    searchQuery: "",
    sortBy: sortBy,
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: "",
  });

  const { data, isLoading } = useAppQuery({
    url: `/api/orders/lookup?perPage=${pagination.perPage}&startCursor=${pagination.startCursor}&endCursor=${pagination.endCursor}&searchQuery=${pagination.searchQuery}&sortBy=${pagination.sortBy}&searchType=${searchType}`,
    reactQueryOptions: {
      enabled: shouldRefetch,
    },
  });
  console.log({ data, isLoading });
  useEffect(() => {
    if (!isLoading && data && data?.orders.length) {
      setShouldRefetch(false);
      setTotalOrders(data.countOrders);
      setOrders(formatOrdersDataForTable(data.orders));
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
  }, [searchQuery, sortBy]);

  return (
    <>
      <ContentHeader
        title="Orders"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        <FilterButtonWrapper>
          <FilterMenuSelect
            id="order-search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            imageUrl={ArrowDownIcon}
          >
            {searchWith.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterMenuSelect>
        </FilterButtonWrapper>
      </ContentHeader>

      <TableContainer>
        <Table>
          <TableHeader
            gridTemplateColumns={
              "1fr 1fr 1.25fr 1.5fr 1fr 1fr 1.5fr auto"
            }
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
            <LoadingWrapper><Loading width={150} height={150}/></LoadingWrapper>
          ) : (
            <TableContent>
              {orders.map((content, index) => (
                <ContentWrapper
                  key={index}
                  gridTemplateColumns={
                    "1fr 1fr 1.25fr 1.5fr 1fr 1fr 1.5fr auto"
                  }
                >
                  <Text color="#fff">{content.id}</Text>
                  <Text color="#fff">{content.order_name}</Text>
                  <Text color="#fff">
                    {content.fullfillment_status ? "fullfilled" : "Unfulfilled"}
                  </Text>
                  <Text color="#fff">{content.customer || "N/A"}</Text>
                  <Text color="#fff">{content.total_spent || 0}</Text>
                  <Text color="#fff">
                    {content.payment_status ? "Paid" : "Unpaid"}
                  </Text>
                  <Text color="#fff">{content.created_at}</Text>
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
                        onClick={() => onDeleteOrder(content.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        padding={"10px"}
                        background={"transparent"}
                        color="#fff"
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
                    borderRadius={2}
                    hoverBackground={"rgba(37, 154, 108, 1)"}
                    disabled={!pagination.hasPreviousPage}
                    onClick={() => updatePagination("prev")}
                  >
                    <CustomIcon src={ArrowLeftIcon} alt="Arrow Left Icon" />
                  </Button>
                  <Text color="#fff">
                    {orders.length} products out of {totalOrders}
                  </Text>
                  <Button
                    background={"rgba(21, 30, 47, 1)"}
                    width={36}
                    height={36}
                    borderRadius={2}
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
    </>
  );
}
