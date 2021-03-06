// @flow
import React, { Component } from 'react';
import { RIESelect, RIEInput, RIENumber } from 'riek';
import _ from 'lodash';
import type { Conditional, GenderConditional , AgeConditional , DateConditional , SocioeconomicStatusConditional , RaceConditional , SymptomConditional , ObservationConditional , VitalSignConditional , ActiveConditionConditional , ActiveMedicationConditional , ActiveCarePlanConditional , PriorStateConditional , AttributeConditional , AndConditional , OrConditional , AtLeastConditional , AtMostConditional , NotConditional } from '../../types/Conditional';
import type { State } from '../../types/State';
import { Codes } from './Code';
import { getTemplate } from '../../templates/Templates';

type Props = {
  conditional: Conditional,
  options: State[],
  onChange: any
}

const unitOfTimeOptions = [
  {id: 'years', text: 'years'},
  {id: 'months', text: 'months'},
  {id: 'weeks', text: 'weeks'},
  {id: 'days', text: 'days'},
  {id: 'hours', text: 'hours'},
  {id: 'minutes', text: 'minutes'},
  {id: 'seconds', text: 'seconds'}
];

const unitOfAgeOptions = [
  {id: 'years', text: 'years'},
  {id: 'months', text: 'months'},
  {id: 'weeks', text: 'weeks'},
  {id: 'days', text: 'days'},
  {id: 'hours', text: 'hours'},
  {id: 'minutes', text: 'minutes'},
  {id: 'seconds', text: 'seconds'}
];

class ConditionalEditor extends Component<Props> {

  renderConditionalType() {
    switch (this.props.conditional.condition_type) {
      case "Gender":
        return <Gender {...this.props} />
      case "Age":
        return <Age {...this.props} />
      case "Date":
        return <Date {...this.props} />
      case "Socioeconomic Status":
        return <SocioeconomicStatus {...this.props} />
      case "Race":
        return <Race {...this.props} />
      case "Symptom":
        return <Symptom {...this.props} />
      case "Observation":
        return <Observation {...this.props} />
      case "Vital Sign":
        return <VitalSign {...this.props} />
      case "Active Condition":
        return <ActiveCondition {...this.props} />
      case "Active Medication":
        return <ActiveMedication {...this.props} />
      case "Active CarePlan":
        return <ActiveCarePlan {...this.props} />
      case "PriorState":
        return <PriorState {...this.props} />
      case "Attribute":
        return <Attribute {...this.props} />
      case "And":
        return <And {...this.props} />
      case "Or":
        return <Or {...this.props} />
      case "At Least":
        return <AtLeast {...this.props} />
      case "At Most":
        return <AtMost {...this.props} />
      case "Not":
        return <Not {...this.props} />
      default:
        return this.props.conditional.condition_type

    }
  }

  render() {
    if (!this.props.conditional) {
      return null;
    }
    let template = getTemplate('Type.Condition');
    let options = Object.keys(template).sort().map((k) => {return {id: k, text: k}});
    return (
      <div>
        Condition Type: <RIESelect className='editable-text' propName='condition' value={{id: this.props.conditional.condition_type, text: this.props.conditional.condition_type}} change={(val) => this.props.onChange({condition:{id: template[val.condition.id]}})} options={options} />
        <br/>
        {this.renderConditionalType()}
      </div>
    );
  }
}

class Gender extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): GenderConditional);
    return (
      <label> Gender:
        <RIESelect className='editable-text'
          propName='gender'
          value={{id: conditional.gender, text: conditional.gender}}
          change={this.props.onChange('gender')}
          options={[{id:'M', text: 'M'}, {id:'F', text: 'F'}]}
        />
      </label>
    );
  }

}

class Age extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AgeConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];
    return (
      <label> Age:
      <RIESelect className='editable-text' value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber className='editable-text' value={conditional.quantity} propName='quantity' change={this.props.onChange('quantity')} />
      <RIESelect className='editable-text' value={{id: conditional.unit, text: conditional.unit}} propName="unit" change={this.props.onChange('unit')} options={unitOfAgeOptions} />
      </label>
    );
  }

}

class Date extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): DateConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];
    return (
      <label> Date:
      <RIESelect className='editable-text' value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber className='editable-text' value={conditional.year} propName='year' change={this.props.onChange('year')} />
      </label>
    );
  }

}

class SocioeconomicStatus extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): SocioeconomicStatusConditional);
    let options = [
      {id: 'Low', text: 'Low'},
      {id: 'Middle', text: 'Middle'},
      {id: 'High', text: 'High'}
    ];
    return (
      <label> Socioeconomic Status:
        <RIESelect className='editable-text' value={{id: conditional.category, text: conditional.category}} propName="category" change={this.props.onChange('category')} options={options} />
      </label>
    )
  }

}

class Race extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): RaceConditional);
    let options = [
      {id: "White", text: "White"},
      {id: "Native", text: "Native"},
      {id: "Hispanic", text: "Hispanic"},
      {id: "Black", text: "Black"},
      {id: "Asian", text: "Asian"},
      {id: "Other", text: "Other"}
    ];
    return (
      <label> Race:
        <RIESelect className='editable-text' value={{id: conditional.race, text: conditional.race}} propName="race" change={this.props.onChange('race')} options={options} />
      </label>
    );
  }

}

class Symptom extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): SymptomConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];

    return (
      <label> Symptom:
      <RIEInput className='editable-text' value={conditional.symptom} propName="symptom" change={this.props.onChange('symptom')} />
      <RIESelect className='editable-text' value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber className='editable-text' value={conditional.value} propName='value' change={this.props.onChange('value')} />

      </label>
    );
  }

}

class Observation extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ObservationConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}, {id: "is nil", text: "is nil"}, {id: "is not nil", text: "is not nil"}];

    let valueInput = <div/>

    // It appears that conditional is inconsistent, sometimes values are in ids
    // This should be tracked down
    if(conditional.operator !== 'is nil' && conditional.operator !== 'is not nil' && conditional.operator.id !== 'is nil' && conditional.operator.id !== 'is not nil'){ 
      valueInput = <RIEInput className='editable-text' value={conditional.value} propName='value' change={this.props.onChange('value')} />
    }

    return (
      <label> Observation:
        <Codes system={getTemplate('Type.Code.Loinc.system')} codes={conditional.codes} onChange={this.props.onChange('codes')} />
        <RIESelect className='editable-text' value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
        {valueInput}
      </label>
    );
  }

}

class VitalSign extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): VitalSignConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];

    return (
      <label> Vital Sign:
      <RIEInput className='editable-text' value={conditional.vital_sign} propName="vital_sign" change={this.props.onChange('vital_sign')} />
      <RIESelect className='editable-text' value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber className='editable-text' value={conditional.value} propName='value' change={this.props.onChange('value')} />

      </label>
    );
  }

}

class ActiveCondition extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ActiveConditionConditional);

    return (
      <label> Active Condition:
        <Codes system={getTemplate('Type.Code.Snomed.system')} codes={conditional.codes} onChange={this.props.onChange('codes')} />
      </label>
    );
  }

}

class ActiveMedication extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ActiveMedicationConditional);
    return (
      <label> ActiveMedication:
      <Codes system={getTemplate('Type.Code.RxNorm.system')} codes={conditional.codes} onChange={this.props.onChange('codes')} />
      </label>
    );
  }

}

class ActiveCarePlan extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ActiveCarePlanConditional);
    return (
      <label> ActiveCarePlan:
      <Codes system={getTemplate('Type.Code.Snomed.system')} codes={conditional.codes} onChange={this.props.onChange('codes')} />
      </label>
    );
  }

}

class PriorState extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): PriorStateConditional);
    let options = this.props.options.map((s) => {return {id: s.name, text: s.name}});
    let name = conditional.name;
    return (
      <label>
        Prior State Name: <RIESelect className='editable-text' value={{id: name, text: name}} propName="name" change={this.props.onChange('name')} options={options} />
        <br />
        {this.renderSince()}
        <br />
        {this.renderWithin()}
      </label>
    );
  }

  renderSince() {
    let conditional = ((this.props.conditional: any): PriorStateConditional);
    if (conditional.since == null) {
      return (
        <label>
          <a className='editable-text' onClick={() => this.props.onChange('since')({val: {id: getTemplate('Attribute.Since')}})}>Add Since</a>
        </label>
      );
    } else {
      let options = this.props.options.map((s) => {return {id: s.name, text: s.name}});
      let since = conditional.since;
      return (
        <label>
          Prior State Since: <RIESelect className='editable-text' value={{id: since, text: since}} propName="since" change={this.props.onChange('since')} options={options} />
          <a className='editable-text' onClick={() => this.props.onChange('since')({val: {id: null}})}> (remove)</a>
        </label>
      );
    }
  }

  renderWithin() {
    let conditional = ((this.props.conditional: any): PriorStateConditional);
    if (conditional.within == null) {
      return (
        <label>
          <a className='editable-text' onClick={() => this.props.onChange('within')({val: {id: getTemplate('Attribute.Within')}})}>Add Within</a>
          <br />
        </label>
      );
    } else {
      return (
        <label>
          Prior State Within Quantity: <RIENumber className='editable-text' value={conditional.within.quantity} propName="quantity" change={this.props.onChange('within.quantity')} />
          <br />
          Prior State Within Unit: <RIESelect className='editable-text' value={{id: conditional.within.unit, text: conditional.within.unit}} propName="unit" change={this.props.onChange('within.unit')} options={unitOfTimeOptions} />
          <br />
          <a className='editable-text' onClick={() => this.props.onChange('within')({val: {id: null}})}>Remove Within</a>
        </label>
      );
    }
  }

}

class Attribute extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AttributeConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}, {id: "is nil", text: "is nil"}, {id: "is not nil", text: "is not nil"}];

    let val = conditional.value;
    if(typeof val === 'boolean'){
      val = String(val);
    }

    let valueInput = <div/>

    // It appears that conditional is inconsistent, sometimes values are in ids
    // This should be tracked down
    if(conditional.operator !== 'is nil' && conditional.operator !== 'is not nil' && conditional.operator.id !== 'is nil' && conditional.operator.id !== 'is not nil'){ 
      valueInput = <RIEInput className='editable-text' value={val||0} propName='value' change={this.props.onChange('value')} />
    }

    return (
      <label>
        <RIEInput className='editable-text' value={conditional.attribute} propName="attribute" change={this.props.onChange('attribute')} />
        <RIESelect className='editable-text' value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
        {valueInput}
      </label>
    );
  }

}

class And extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AndConditional);
    return (
      <label> And:
        {conditional.conditions.map((cond, i) => {
          return (
            <div className="section"  key={i}>
              <ConditionalEditor {...this.props} conditional={cond} onChange={this.props.onChange(`conditions.${i}`)} />
            </div>
          )
        })}
      </label>
    );
  }

}

class Or extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): OrConditional);
    return (
      <label> Or:
        {conditional.conditions.map((cond, i) => {
          return (
              <div className="section" key={i}>
                <ConditionalEditor {...this.props} conditional={cond} onChange={this.props.onChange(`conditions.${i}`)} />
              </div>
          )
        })}
      </label>
    );
  }

}

class AtLeast extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AtLeastConditional);
    return (
      <label> At Least
        <RIENumber className='editable-text' value={conditional.minimum||0} propName='minimum' change={this.props.onChange('minimum')} />:
        {conditional.conditions.map((cond, i) => {
          return (
            <div className="section" key={i}>
              <ConditionalEditor {...this.props} conditional={cond} onChange={this.props.onChange(`conditions.${i}`)} />
            </div>
          )
        })}
      </label>
    );
  }

}

class AtMost extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AtMostConditional);
    return (
      <label> At Most
        <RIENumber className='editable-text' value={conditional.maximum||0} propName='maximum' change={this.props.onChange('maximum')} />:

        {conditional.conditions.map((cond, i) => {
          return (
            <div className="section" key={i}>
              <ConditionalEditor {...this.props} conditional={cond} onChange={this.props.onChange(`conditions.${i}`)} />
            </div>
          )
        })}
      </label>
    );
  }

}

class Not extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): NotConditional);
    return (
      <label> Not:
        <div className="section">
          <ConditionalEditor {...this.props} conditional={conditional.condition} onChange={this.props.onChange('condition')} />
        </div>
      </label>
    );
  }

}

export default ConditionalEditor;
