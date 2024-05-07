import { Box, Heading, Text, VStack, Circle, Icon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");

  return (
    <Box
      bg="gray.100"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} alignItems="center">
        <Circle
          size="xl"
          bg="green.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={CheckIcon} w={12} h={12} />
        </Circle>

        <Heading as="h1" size="xl" textTransform="uppercase" color="blue.600">
          Order Successful
        </Heading>

        <Text fontSize="lg" fontWeight="bold">
          Reference No.: {referenceNum}
        </Text>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
