import { Component } from 'react';
import { connect } from 'react-redux';
import { changeComponent, changeValue } from './actions';

import AddressInput from './components/AddressInput';
import CronInput from './components/CronInput';
import Clock from './components/Clock';
import DatePicker from './components/DatePicker';
import DateTimePicker from './components/DateTimePicker';
import DateTimeRangePicker from './components/DateTimeRangePicker';
import DraggableList from './components/DraggableList';
import GridView from './components/GridView';
import LoadingTouchButton from './components/LoadingTouchButton';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownText from './components/MarkdownText';
import NestableList from './components/NestableList';
import PercentageInput from './components/PercentageInput';
import PriceInput from './components/PriceInput';
import CronPicker from './components/CronPicker';
import S3PhotoUploader from './components/S3PhotoUploader';
import Select from './components/Select';
import SectionList from './components/SectionList';
import Signature from './components/Signature';
import Slider from './components/Slider';
import SlideShow from './components/SlideShow';
import TouchAnchor from './components/TouchAnchor';
import TouchButton from './components/TouchButton';
import TouchCheckbox from './components/TouchCheckbox';
import TagInput from './components/TagInput';
import TemplateForm from './components/TemplateForm';
import TimePicker from './components/TimePicker';
import TimeSpanInput from './components/TimeSpanInput';
import ValidTextInput from './components/ValidTextInput';
import ValidTextareaInput from './components/ValidTextareaInput';

const components = ["Clock","DatePicker","DateTimePicker", "DateTimeRangePicker", "DraggableList", "GridView","HoursInput","LoadingTouchButton","MarkdownEditor","MarkdownText", "NestableList", "PercentageInput","PriceInput","ResultsTextInput","CronPicker",
									"S3PhotoUploader", "SectionList", "Select","Signature","Signup","Slider","SlideShow","TagInput","TemplateForm","TimePicker","TimeSpanInput", "TouchButton","TouchCheckbox","ValidTextInput","ValidTextareaInput","WeekCalendar"];

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

class SectionHeader extends Component {
	render() {
		return (
			<div className="sectionHeader">
				<h4>{this.props.data.title}</h4>
			</div>
		);
	}
}

class ListItem extends Component {
	render() {
		return (
			<div className="item">
				<p>{this.props.data.title}</p>
			</div>
		);
	}
}


class Playground extends Component {
	pickComponent = (e) => {
		var component = e.target.value;
		this.setState({ 
			component : component
		});
	}
	onValueChange = (value, name) => {
		var values = this.state.values
		values[name] = value;
		this.setState({ values : values });
	}
	onToggleLoading = () => {
		this.setState({ loading : !this.state.loading });
	}
 	render() {
 		var options = []
 			, component, extras;

 		components.forEach(function(c,i){
 			options.push(<option key={i} value={c}>{c}</option>);
 		});

 		switch (this.state.component) {
 		case "AddressInput":
 			component = <AddressInput name="AddressInput" value={this.state.values.AddressInput} onValueChange={this.onValueChange} showNameField={true} />
 			break;
		case "Clock":
			component = <Clock />
			break;
		case "DatePicker":
			component = <DatePicker />
			break;
		case "DateTimeRangePicker":
			component = <DateTimeRangePicker name="DateTimePicker" value={this.state.values.DateTimeRangePicker} onValueChange={this.onValueChange} />
			break;
		case "DraggableList":
			component = <DraggableList name="DraggableList" data={this.state.values.DraggableList} onRearrange={this.onValueChange} />
			break;
		case "GridView":
			component = <GridView data={this.state.values.GridView} />
			break;
		case "HoursInput":
			component = <HoursInput name="HoursInput" value={this.state.values.HoursInput} onValueChange={this.onValueChange} />
			break;
		case "LoadingTouchButton":
			extras = <p><TouchAnchor onClick={this.onToggleLoading} text="toggle loading" /></p>
			component = <LoadingTouchButton loading={this.state.loading} onClick={this.onToggleLoading} />
			break;
		case "MarkdownEditor":
			component = <MarkdownEditor />
			break;
		case "MarkdownText":
			component = <MarkdownText />
			break;
		case "NestableList":
			component = <NestableList name="NestableList" data={this.state.values.NestableList} onRearrange={this.onValueChange} />
			break;
		case "PercentageInput":
			component = <PercentageInput name="PercentageInput" value={this.state.values.PercentageInput} onValueChange={this.onValueChange} />
			break;
		case "PriceInput":
			component = <PriceInput />
			break;
		case "ResultsTextInput":
			component = <ResultsTextInput />
			break;
		case "CronPicker":
			component = <CronPicker name="CronPicker" value={this.state.values.CronPicker} onValueChange={this.onValueChange} />
			break;
		case "S3PhotoUploader":
			component = <S3PhotoUploader />
			break;
		case "SectionList":
			component = <SectionList data={this.state.SectionListData} header={SectionHeader} element={ListItem} />
			break;
		case "Signature":
			component = <Signature />
			break;
		case "Signup":
			component = <Signup />
			break;
		case "TagInput":
			component = <TagInput name="TagInput" value={this.state.values.TagInput} onValueChange={this.onValueChange} />
			break;
		case "TemplateForm":
			component = <TemplateForm name="TemplateForm" template="mary {had} a little {lamb} whos fleece was white as {snow}!" value={this.state.values.TemplateForm} onValueChange={this.onValueChange} />
			break;
		case "TimePicker":
			component = <TimePicker />
			break;
		case "TimeSpanInput":
			component = <TimeSpanInput name="TimeSpanInput" value={this.state.values.TimeSpanInput} onValueChange={this.onValueChange} />
			break;
		case "TouchButton":
			component = <TouchButton name="TouchButton" text="Button" />
			break;
		case "TouchCheckbox":
			component = <TouchCheckbox name="TouchCheckbox" label="Checkbox" value={this.state.values.TouchCheckbox} onValueChange={this.onValueChange} />
			break;
		case "DateTimePicker":
			component = <DateTimePicker name="DateTimePicker" value={this.state.values.DateTimePicker} centerDate={this.state.values.DateTimePickerCenter} onValueChange={this.onValueChange} />
			break;
		case "ValidTextInput":
			component = <ValidTextInput label="valid text field" placeholder="stuff" valid={false} />
			break;
		case "SlideShow":
			var slides = [
					"http://i.imgur.com/vdiCQB2.jpg",
					"http://i.imgur.com/6YS1sqT.jpg",
					"http://i.imgur.com/YSD5Now.jpg",
					"http://i.imgur.com/QSImV2B.jpg",
					"http://i.imgur.com/iQXytyM.jpg"
				]
			component = <SlideShow slides={slides} />
			break;
		case "Slider":
			component = <Slider />
			break;
		case "Select":
			var opts = [
				[0,"groceries"],
				[1,"apples"],
				[2,"bananas"],
				[3,"oranges"],
				[4,"dates"],
				[5,"prunes"]
			];
			component = <Select name="Select" value={this.state.values.Select} options={opts} onValueChange={this.onValueChange} />
			break;
		case "ValidTextareaInput":
			component = <ValidTextareaInput id="ValidTextArea" label="Text Area Input" value={this.state.values.ValidTextareaInput} name="ValidTextareaInput" onValueChange={this.onValueChange} />
			break;
		case "WeekCalendar":
			component = <WeekCalendar data={this.state.values.WeekCalendar} height={500} />
			break;
 		}
		return (
			<div className="components playground">
				<header>
					<div className="content">
						<h1>Component Playground</h1>
						<select value={this.state.component} onChange={this.pickComponent}>
							{options}
						</select>
						<h3 className="title">Component: {this.state.component}</h3>
					</div>
				</header>
				<div className="component">
					<div className="extras">
						{extras}
					</div>
					<div className="wrapper">
						{component}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state.default;
}

function mapDispatchToProps(dispatch) {
	return {
		onChangeComponent : (component) => dispatch(changeComponent(component)),
		onValueChange : (name, value) => dispatch(changeValue(name, value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playground);