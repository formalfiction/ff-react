import { CHANGE_COMPONENT, CHANGE_VALUE } from './actions';

var thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(-30);
thirtyDaysAgo.setHours(18);

var foFive = new Date();
// foFive.setMinutes(25);

var nextHour = new Date();
nextHour.setHours(nextHour.getHours() + 1)
nextHour.setMinutes(0)
nextHour.setSeconds(0)
nextHour.setMilliseconds(0)

var threeHoursFromNow = new Date(nextHour);
threeHoursFromNow.setHours(threeHoursFromNow.getHours() + 2);

const defaultState = {
	component : "NestableList",
	values : {
		AddressInput : {},
		Clock : new Date(),
		DateTimePicker : thirtyDaysAgo,
		DateTimePickerCenter : thirtyDaysAgo,
		DraggableList : [
			"Apples",
			"Oranges",
			"Bananas",
			"Michael Jordan",
			"Dragonfruit",
			"Molly & O.J's"
		],
		CronPicker : "0 0 * * *",
		GridView : [
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["I","will","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
			["LAST","ROW","not","instruct","my","classmates","on","ancient","gelatin", "production", "processes"],
		],
		NestableList : [
			{ name : "Apples" },
			{ name : "Oranges" },
			{ name : "Bananas" },
			{ name : "Michael Jordan" },
			{ name : "Dragonfruit" },
			{ name : "Molly & O.J's",
				data : [
					{ name : "Potato" },
					{ name : "Norwegian Club" }
				]
			},
		],
		TagInput : ["a tag","taggie","tag","snag"],
		Select : 0,
		PercentageInput : 0.20,
		HoursInput : "Mo-Sa 9:00-17:00",
		DateTimeRangePicker : [new Date(), new Date()],
		TimeSpanInput : [new Date(), new Date()],
		ValidTextareaInput : "huh? asdfkljhads flkjhasfa \n asdfasfdas df \n werd.",
		TemplateForm : {},
		TouchCheckbox : false,
		WeekCalendar : [{ startDate : nextHour, endDate : threeHoursFromNow, title : "Booking", allDay : false }]
	},
	SectionListData : [
		{
			section : {
				title : "This is a section",
			},
			data : [
				{ title : "one" },
				{ title : "two" },
				{ title : "three" },
			]
		},
		{
			section : {
				title : "Another Section",
			},
			data : [
				{ title : "four" },
				{ title : "five" },
			]
		},
		{
			section : {
				title : "Third Section"
			},
			data : [
				{ title : "six" },
				{ title : "seven" },
				{ title : "eight" },
				{ title : "nine" },
			]
		}
	],
	loading : false
}

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case CHANGE_COMPONENT:
			return {...state, component : action.component}
		case CHANGE_VALUE:
			let s =  {...state}
			s.values[action.name] = action.value;
			return s
		default:
			return state;
	}
}