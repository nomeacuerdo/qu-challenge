import { defineStore } from 'pinia';

type PlanetResults = {
  id: number;
  name: string;
  climate: string;
  rotation_period: string;
  url: string;
};

export const usePlanetStore = defineStore('planetStore', {
  state: () => ({
    count: 0,
    page: 0,
		next: '',
		previous: '',
		results: [{
      id: 0,
      name: '',
      climate: '',
      rotation_period: '',
      url: '',
    }],
    sortField: 'id',
    sortCrit: 'asc',
  }),
  getters: {
    currentResultsCount(): any {
      return `${(this.page - 1) * this.results.length + 1} - ${this.page * this.results.length}`;
    },
  },
  actions: {
    sort(field: string) {
      const vm = this;
      if (this.sortField === field) {
        this.sortCrit = (this.sortCrit === 'asc') ? 'desc' : 'asc';
      } else {
        this.sortField = field;
      }
      this.results = this.results.sort((a:PlanetResults, b:PlanetResults) => {
        switch(field) {
          case 'id':
          case 'rotation_period':
            if(vm.sortCrit === 'asc') {
              return Number(a[field as keyof PlanetResults]) - Number(b[field as keyof PlanetResults]);
            }
            if(vm.sortCrit === 'desc') {
              return Number(b[field as keyof PlanetResults]) - Number(a[field as keyof PlanetResults]);
            }
            break;
          case 'name':
            if(vm.sortCrit === 'asc') {
              return (a[field as keyof PlanetResults] > b[field as keyof PlanetResults]) ? 1 : -1;
            }
            if(vm.sortCrit === 'desc') {
              return (a[field as keyof PlanetResults] < b[field as keyof PlanetResults]) ? 1 : -1;
            }
            break;
        }
        return 0;
      });
    },
    async getPlanetData(url: string) {
      const result = await fetch(url);
      const data = await result.json();

      // REGULAR RESULTS LOADING
      this.sortField = 'id';
      this.sortCrit = 'asc';
      this.count = data.count;
      this.next = data.next;
      this.previous = data.previous;
      this.page = data.next
        ? (parseInt(data.next.split('page=')[1], 10) - 1)
        : (parseInt(data.previous.split('page=')[1], 10) + 1);
      this.results = data.results.map((item: any) => ({ id: item.url.split('/').slice(-2).shift(), ...item }));

      // PROGRESSIVELY LOAD ALL THE RESULTS - HIGH IMPACT
      // this.count = data.count;
      // this.results.push(...data.results)
      // if (data.next) {
      //   this.getPlanetData(data.next);
      // }
    }
  }
});
