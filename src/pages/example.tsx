import { BadgeDelta, Card, Flex, Metric, ProgressBar, Text, Title, AreaChart } from "@tremor/react"

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
]

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString()
}

export default function Example() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <Card className='max-w-md'>
        <Flex alignItems='start'>
          <div>
            <Text>Sales</Text>
            <Metric className='text-secondary'>$ 12,699</Metric>
          </div>
          <BadgeDelta deltaType='moderateIncrease'>13.2%</BadgeDelta>
        </Flex>
        <Flex className='mt-4'>
          <Text className='truncate'>68% ($ 149,940)</Text>
          <Text> $ 220,500 </Text>
        </Flex>
        <ProgressBar percentageValue={15.9} className='mt-2' />
      </Card>
      <Card className='max-w-md mt-4'>
        <Title>Newsletter revenue over time (USD)</Title>
        <AreaChart
          className='h-72 mt-4'
          data={chartdata}
          index='date'
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  )
}
