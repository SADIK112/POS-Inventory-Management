import React, { useState, useEffect } from "react";
import { ContentHeader } from "../index";
import {
  ArrowUpDownIcon,
  ActionIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
} from "../../assets/index.js";
import { Text, CustomIcon, Button, Select } from "../common/commonStyle.js";
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
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch.js";
import Modal from "../common/Modal.jsx";
import CustomerUpdateModal from "./CustomerUpdateModal/index.jsx";

const tableHeader = [
  {
    title: "id",
    sort: true,
    sortType: "ID",
  },
  {
    title: "Customer Name",
    sort: true,
    sortType: "NAME",
  },
  {
    title: "Total Spent",
    sort: true,
    sortType: "TOTAL_SPENT",
  },
  {
    title: "Address",
    sort: true,
    sortType: "LOCATION",
  },
  {
    title: "Email",
  },
  {
    title: "Phone",
  },
  {
    title: "Email Subscribed",
  },
  {
    title: "Action",
  },
];

const searchWith = [
  { value: "email", label: "Email" },
  { value: "country", label: "Country" },
  { value: "phone", label: "Phone" },
  { value: "state", label: "State" },
];

const formatCustomersDataForTable = (customers) => {
  return customers.map((customer) => {
    return {
      id: getNumberVariantId(customer.id),
      customer_name: customer?.displayName,
      firstname: customer?.firstName || "",
      lastname: customer?.lastName || "",
      total_spent: +customer?.amountSpent?.amount,
      email: customer?.email || "",
      phone: customer?.phone || "",
      address1: customer?.defaultAddress?.address1 || "",
      address2: customer?.defaultAddress?.address2 || "",
      city: customer?.defaultAddress?.city || "",
      province: customer?.defaultAddress?.province || "",
      country: customer?.defaultAddress?.country || "",
      zip: customer?.defaultAddress?.zip || "",
      email_subscribed: customer?.emailMarketingConsent?.marketingState,
      triggerAction: false,
      edit: false,
    };
  });
};

export function CustomerList() {
  const fetch = useAuthenticatedFetch();
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [sortBy, setSortBy] = useState("CREATED_AT");
  const [editCustomer, setEditCustomer] = useState(null);
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
    url: `/api/customers/lookup?perPage=${pagination.perPage}&startCursor=${pagination.startCursor}&endCursor=${pagination.endCursor}&searchQuery=${pagination.searchQuery}&sortBy=${pagination.sortBy}&searchType=${searchType}`,
    reactQueryOptions: {
      enabled: shouldRefetch,
      staleTime: 0,
      cacheTime: 0,
    },
  });

  useEffect(() => {
    if (!isLoading && data && data?.customers.length) {
      setShouldRefetch(false);
      setTotalCustomers(data.countCustomers);
      setCustomers(formatCustomersDataForTable(data.customers));
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

  const handleAction = (index) => {
    const updatedCustomers = customers.map((customer, i) => ({
      ...customer,
      triggerAction: i === index ? !customer.triggerAction : false,
    }));

    setCustomers(updatedCustomers);
  };

  const onEditCustomer = (customer) => {
    setIsEditModalOpen(true);
    setEditCustomer(customer);
  };

  const handleModalClose = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setIsModalClosing(false);
    }, 200);
    setEditCustomer(null);
  };

  const onSubmitEditRequest = async (customer) => {
    try {
      const response = await fetch(`/api/customers/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer }),
      });

      if (!response.ok) {
        throw new Error("Error updating customer");
      }

      const result = await response.json();

      setShouldRefetch(true);
      refetch();
      setIsEditModalOpen(false);
      setEditCustomer(null);
      console.log("updateCustomer", result);
    } catch (error) {
      console.error("Error updating customer", error);
    }
  };

  const onDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
        Accept: "application/json",
        "Content-Type": "application/json",
      });

      if (!response.ok) {
        throw new Error("Error deleting customer");
      }

      const result = await response.json();

      setShouldRefetch(true);
      refetch();

      console.log("deleteCustomer", result);
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  return (
    <>
      <ContentHeader
        title="Customers"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        <div>
          <Select
            id="customer-search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            imageUrl={ArrowDownIcon}
          >
            {searchWith.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </ContentHeader>

      <TableContainer>
        <Table>
          <TableHeader
            gridTemplateColumns={"1.25fr 2fr 1fr 2fr 2fr 1fr 1.5fr auto"}
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
              {customers.map((content, index) => (
                <ContentWrapper
                  key={index}
                  gridTemplateColumns={"1.25fr 2fr 1fr 2fr 2fr 1fr 1.5fr auto"}
                >
                  <Text color="#fff">{content.id}</Text>
                  <Text color="#fff">{content.customer_name}</Text>
                  <Text color="#fff">{content.total_spent}</Text>
                  <Text color="#fff">
                    {content.address1 ? `${content.address1}, ` : ""}
                    {content.address2 ? `${content.address2}, ` : ""}
                    {content.province ? `${content.province}, ` : ""}
                    {content.city ? `${content.city}, ` : ""}
                    {content.country ? `${content.country}, ` : ""}
                  </Text>
                  <Text color="#fff">{content.email || "N/A"}</Text>
                  <Text color="#fff">{content.phone || "N/A"}</Text>
                  <Text color="#fff">{content.email_subscribed}</Text>
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
                        onClick={() => onDeleteCustomer(content.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        padding={"10px"}
                        background={"transparent"}
                        color="#fff"
                        onClick={() => onEditCustomer(content)}
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
                    {customers.length} products out of {totalCustomers}
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
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        isClosing={isModalClosing}
        width={600}
      >
        <CustomerUpdateModal
          customer={editCustomer}
          handleSubmit={onSubmitEditRequest}
        />
      </Modal>
    </>
  );
}
