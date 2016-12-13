import Vue from 'vue';
import VueResource from 'vue-resource';
import moment from 'moment';

Vue.use(VueResource);

// render css from less
import style from '../less/theme.less';

new Vue({
	ready() {
		this.updateData();
    },
	el: '#api-data',
	data: {
		payloadOne: {},
		labelsOne: [],
		sdbOne: [],
		soundOne: [],
		airOne: [],
		humOne: [],
		tempOne: [],
		gasOne: [],
		status: null
	},
	methods: {
		updateData: function () {
			console.log('start polling');

            this.$http.get('//hackathontw.au-syd.mybluemix.net/api/status').then((response) => {
				// success callback
				var payloadData = response.json();

console.log(payloadData)

				var labelsOne = [];
				var sdbOne = [];
				var soundOne = [];
				var airOne = [];
				var humOne = [];
				var tempOne = [];
				var gasOne = [];
				var dateOne = [];
				for (var index in payloadData) {
					var data = JSON.parse(payloadData[index].payload);
					if (data.peopleID == '01') {
						labelsOne.push(index);
						soundOne.push(data.data.sou);
						airOne.push(data.data.air);
						sdbOne.push(data.data.sdb);
						humOne.push(data.data.hum);
						tempOne.push(data.data.tmp);
						gasOne.push(data.data.gas);
						dateOne.push(data.data.date);
					}
				}

				var maxSdbOne = Math.min(...soundOne);
				maxSdbOne = maxSdbOne;
				var maxIndexOne = soundOne.indexOf(maxSdbOne);

				var payloadOne = {};
				payloadOne.peopleID = '01';
				payloadOne.date = dateOne[maxIndexOne];
				payloadOne.sou = soundOne[maxIndexOne];
				payloadOne.air = airOne[maxIndexOne];
				payloadOne.hum = humOne[maxIndexOne];
				payloadOne.tmp = tempOne[maxIndexOne];
				payloadOne.gas = gasOne[maxIndexOne];
				payloadOne.sdb = sdbOne[maxIndexOne];

				this.$set('payloadOne', payloadOne);

				this.$set('labelsOne', labelsOne);
				this.$set('sdbOne', sdbOne);
				this.$set('soundOne', soundOne);
				this.$set('airOne', airOne);
				this.$set('humOne', humOne);
				this.$set('tempOne', tempOne);
				this.$set('gasOne', gasOne);
				this.$set('status', 'success');

				setTimeout(this.updateData, 1000 * 2);
			}, (response) => {
				// error callback
				this.$set('status', 'error');
			});

            var setting = {
				fullWidth: true,
				height: '100px',
				// As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
				axisX: {
					showLabel: false,
					showGrid: false,
				},
				axisY: {
					onlyInteger: true,
					offset: 0,
					showLabel: false,
					showGrid: false,
				}
			};

			new Chartist.Line('#ct-chart-sdb-one',
				{
					labels: this.labelsOne,
					series: [
						this.sdbOne
					]
				}, setting
			);
			new Chartist.Line('#ct-chart-sound-one',
				{
					labels: this.labelsOne,
					series: [
						this.soundOne
					]
				}, setting
			);
			new Chartist.Line('#ct-chart-air-one',
				{
					labels: this.labelsOne,
					series: [
						this.airOne
					]
				}, setting
			);
			new Chartist.Line('#ct-chart-hum-one',
				{
					labels: this.labelsOne,
					series: [
						this.humOne
					]
				}, setting
			);
			new Chartist.Line('#ct-chart-temp-one',
				{
					labels: this.labelsOne,
					series: [
						this.tempOne
					]
				}, setting
			);
			new Chartist.Line('#ct-chart-gas-one',
				{
					labels: this.labelsOne,
					series: [
						this.gasOne
					]
				}, setting
			);
        },
		submit: function (event) {
			console.log(this.payloadOne)
		}
	}
})