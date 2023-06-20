// import CustomButton from "../ui/CustomButton"
import CalendarImage from "../../assets/images/calendar.png"
import { InformationCircleIcon } from "@heroicons/react/solid"

import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  BadgeDelta,
  DeltaType,
  Flex,
  Metric,
  ProgressBar,
  AreaChart,
  Color,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"

type Kpi = {
  title: string
  metric: string
  progress: number
  target: string
  delta: string
  deltaType: DeltaType
}

const kpiData: Kpi[] = [
  {
    title: "Sales",
    metric: "$ 12,699",
    progress: 15.9,
    target: "$ 80,000",
    delta: "13.2%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Customers",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
]

import { useState } from "react"

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

const formatters: { [key: string]: any } = {
  Sales: (number: number) => `$ ${usNumberformatter(number)}`,
  Customers: (number: number) => `${usNumberformatter(number)}`,
  Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
}

const Kpis = {
  Sales: "Sales",
  Customers: "Customers",
}

const kpiList = [Kpis.Sales, Kpis.Customers]

export type DailyPerformance = {
  date: string
  Sales: number
  Customers: number
}

export const performance: DailyPerformance[] = [
  {
    date: "2023-05-01",
    Sales: 900.73,
    Customers: 73,
  },
  {
    date: "2023-05-02",
    Sales: 1000.74,
    Customers: 74,
  },
  {
    date: "2023-05-03",
    Sales: 1100.93,
    Customers: 293,
  },
  {
    date: "2023-05-04",
    Sales: 1200.9,
    Customers: 29,
  },
]

export type SalesPerson = {
  name: string
  leads: number
  sales: string
  quota: string
  variance: string
  region: string
  status: string
}

export const salesPeople: SalesPerson[] = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
  },
]

const deltaTypes: { [key: string]: DeltaType } = {
  average: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
}

const EventDashBoard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedKpi = kpiList[selectedIndex]
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedNames, setSelectedNames] = useState<string[]>([])

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0)

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: performance,
    index: "date",
    categories: [selectedKpi],
    colors: ["blue"] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 56,
  }
  return (
    <>
      <div className="text-neutralDark">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-[23px] font-semibold">event Dashboard</h2>
          {/* <CustomButton className='mt-[1em] w-[5em]'>Save</CustomButton> */}
        </div>
      </div>
      {
        // eslint-disable-next-line no-constant-condition
        true ? (
          <TabGroup className="mt-6">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Detail</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid numItemsLg={2} className="mt-6 gap-6">
                  {kpiData.map((item) => (
                    <Card key={item.title}>
                      <Flex alignItems="start">
                        <div className="truncate">
                          <Text>{item.title}</Text>
                          <Metric className="truncate">{item.metric}</Metric>
                        </div>
                        <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
                      </Flex>
                      <Flex className="mt-4 space-x-2">
                        <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                        <Text>{item.target}</Text>
                      </Flex>
                      <ProgressBar value={item.progress} className="mt-2" />
                    </Card>
                  ))}
                </Grid>
                <div className="mt-6">
                  <Card>
                    <>
                      <div className="md:flex justify-between">
                        <div>
                          <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                            <Title> Sales History </Title>
                            <Icon
                              icon={InformationCircleIcon}
                              variant="simple"
                              tooltip="Shows daily increase or decrease for sales"
                            />
                          </Flex>
                          <Text> Daily change for sales </Text>
                        </div>
                        <div>
                          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                            <TabList color="gray" variant="solid">
                              <Tab value={""}>Sales</Tab>
                              <Tab>Customers</Tab>
                            </TabList>
                          </TabGroup>
                        </div>
                      </div>
                      {/* web */}
                      <div className="mt-8 hidden sm:block">
                        <AreaChart {...areaChartArgs} />
                      </div>
                      {/* mobile */}
                      <div className="mt-8 sm:hidden">
                        <AreaChart
                          {...areaChartArgs}
                          startEndOnly={true}
                          showGradient={false}
                          showYAxis={false}
                        />
                      </div>
                    </>
                  </Card>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-6">
                  <Card>
                    <>
                      <div>
                        <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                          <Title> Performance History </Title>
                          <Icon
                            icon={InformationCircleIcon}
                            variant="simple"
                            tooltip="Shows sales performance per employee"
                          />
                        </Flex>
                      </div>
                      <div className="flex space-x-2">
                        <MultiSelect
                          className="max-w-full sm:max-w-xs"
                          onValueChange={setSelectedNames}
                          placeholder="Select Salespeople..."
                        >
                          {salesPeople.map((item) => (
                            <MultiSelectItem key={item.name} value={item.name}>
                              {item.name}
                            </MultiSelectItem>
                          ))}
                        </MultiSelect>
                        <Select
                          className="max-w-full sm:max-w-xs"
                          defaultValue="all"
                          onValueChange={setSelectedStatus}
                        >
                          <SelectItem value="all">All Performances</SelectItem>
                          <SelectItem value="overperforming">Overperforming</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="underperforming">Underperforming</SelectItem>
                        </Select>
                      </div>
                      <Table className="mt-6">
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell className="text-right">Leads</TableHeaderCell>
                            <TableHeaderCell className="text-right">Sales ($)</TableHeaderCell>
                            <TableHeaderCell className="text-right">Quota ($)</TableHeaderCell>
                            <TableHeaderCell className="text-right">Variance</TableHeaderCell>
                            <TableHeaderCell className="text-right">Region</TableHeaderCell>
                            <TableHeaderCell className="text-right">Status</TableHeaderCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {salesPeople
                            .filter((item) => isSalesPersonSelected(item))
                            .map((item) => (
                              <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.leads}</TableCell>
                                <TableCell className="text-right">{item.sales}</TableCell>
                                <TableCell className="text-right">{item.quota}</TableCell>
                                <TableCell className="text-right">{item.variance}</TableCell>
                                <TableCell className="text-right">{item.region}</TableCell>
                                <TableCell className="text-right">
                                  <BadgeDelta deltaType={deltaTypes[item.status]} size="xs">
                                    {item.status}
                                  </BadgeDelta>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </>
                  </Card>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        ) : (
          <div className="h-auto w-auto flex flex-col items-center mt-[5em]">
            <div>
              <img src={CalendarImage} alt="calendar" className="h-[20em] w-[30em]" />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-[25px] font-semibold">Oops! No Data yet</h2>
              <p className="mt-[1em] text-[#6D7175] text-[1.1em]">
                This section will be updated as soon as you start selling tickets
              </p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default EventDashBoard
