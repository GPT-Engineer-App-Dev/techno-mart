import { Box, Container, VStack, Heading, Text, SimpleGrid, Image, Button, Input, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    brand: "Brand A",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    price: 999,
    category: "Electronics",
    brand: "Brand B",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "Stay connected on the go",
    price: 199,
    category: "Wearables",
    brand: "Brand A",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 299,
    category: "Accessories",
    brand: "Brand C",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (value) => {
    setSelectedBrands(value);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value.split("-");
    setPriceRange([parseInt(value[0]), parseInt(value[1])]);
  };

  const filteredProducts = sampleProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to Electronics Store
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Discover the latest in electronic devices and accessories
        </Text>
        <Input
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          mb={4}
        />
        <Select placeholder="Select category" onChange={handleCategoryChange} mb={4}>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Accessories">Accessories</option>
        </Select>
        <CheckboxGroup onChange={handleBrandChange} mb={4}>
          <Stack spacing={5} direction="row">
            <Checkbox value="Brand A">Brand A</Checkbox>
            <Checkbox value="Brand B">Brand B</Checkbox>
            <Checkbox value="Brand C">Brand C</Checkbox>
          </Stack>
        </CheckboxGroup>
        <Select placeholder="Select price range" onChange={handlePriceRangeChange} mb={8}>
          <option value="0-100">0 - 100</option>
          <option value="100-500">100 - 500</option>
          <option value="500-1000">500 - 1000</option>
        </Select>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.imageUrl} alt={product.name} mb={4} />
              <Heading as="h3" size="md" mb={2}>
                {product.name}
              </Heading>
              <Text mb={2}>{product.description}</Text>
              <Text fontWeight="bold" mb={4}>
                ${product.price}
              </Text>
              <Button colorScheme="teal">Add to Cart</Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;