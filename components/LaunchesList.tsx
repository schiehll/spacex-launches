import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import dayjs from "dayjs";

export type Launch = {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    video_link: string;
  };
  thumbnail: string;
};

type Props = {
  launches: Launch[];
};

const LaunchesList = ({ launches }: Props) => {
  return (
    <Wrap spacing="40px" justify="center">
      {launches.map((launch: Launch) => {
        return (
          <WrapItem
            key={launch.id}
            maxW="200px"
            border="1px solid"
            borderColor="gray.200"
            borderEndRadius="4px"
            data-testid="launch"
          >
            <Box as="a" href={launch.links.video_link} target="_blank">
              <Box borderTopRadius="4px" overflow="hidden">
                <Image
                  src={launch.thumbnail}
                  alt={launch.mission_name}
                  borderTopRadius="4px"
                  objectFit="none"
                  _hover={{ transform: "scale(1.1)" }}
                  transition="transform 0.5s"
                />
              </Box>
              <VStack
                borderBottomRadius="4px"
                padding="4"
                justify="flex-start"
                align="flex-start"
                minH="100%"
              >
                <Heading size="xs" fontWeight="semibold" data-testid="mission">
                  {launch.mission_name}
                </Heading>
                <Text fontSize="xs" color="gray.400" data-testid="date">
                  {dayjs(launch.launch_date_local).fromNow()}
                </Text>
                <Text fontSize="sm" color="gray.600" data-testid="site">
                  {launch.launch_site.site_name_long}
                </Text>
              </VStack>
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default LaunchesList;
