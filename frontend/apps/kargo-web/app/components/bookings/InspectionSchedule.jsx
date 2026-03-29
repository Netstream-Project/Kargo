export default function InspectionSchedule({ schedule }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#460003]/10 p-2 rounded">
            <span className="material-symbols-outlined text-[#460003]">assignment_turned_in</span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-[#142026]">Schedule</h3>
        </div>
        <div className="flex bg-[#eeeeee] rounded-lg p-1 border border-slate-300/30">
          <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-[#460003] text-white rounded shadow-sm transition-all">Today</button>
          <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#460003] transition-colors">Week</button>
        </div>
      </div>

      <div className="bg-[#f3f3f3] rounded-xl overflow-hidden shadow-sm grid grid-cols-[80px_1fr]">
        {/* Hourly Labels Column */}
        <div className="border-r border-slate-200/50 bg-slate-50/50 flex flex-col justify-between py-6">
          {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"].map((hour, idx) => (
            <div key={idx} className="h-24 flex items-center justify-center border-b border-transparent">
               <span className="text-[10px] font-bold text-slate-400">{hour}</span>
            </div>
          ))}
        </div>

        {/* Planner Grid Content */}
        <div className="relative p-6 space-y-4">
          {schedule.map((task, idx) => (
            <div key={idx} className={`rounded border-l-4 shadow-sm p-4 flex items-center justify-between hover:translate-x-1 transition-transform cursor-pointer ${
              task.status === 'Scheduled' ? 'bg-white border-[#3a5f94]' :
              task.status === 'In Progress' ? 'bg-white border-amber-500' :
              task.status === 'Delayed' ? 'bg-red-50/30 border-[#460003]' : 
              'bg-slate-50/50 border-slate-300 opacity-60'
            }`}>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">Container</span>
                  <span className={`font-bold text-sm ${task.status === 'Delayed' ? 'text-[#460003]' : 'text-[#142026]'}`}>{task.id}</span>
                </div>
                <div>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">Slot</span>
                  <span className="text-xs font-semibold text-[#142026]">{task.slot}</span>
                </div>
                <div>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">Inspector</span>
                  <span className="text-xs font-bold text-[#142026]">{task.inspector}</span>
                </div>
                <div>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">ETA</span>
                  <span className={`text-xs font-bold ${task.status === 'Delayed' ? 'text-[#460003]' : 'text-[#142026]'}`}>{task.eta}</span>
                </div>
                <div className="w-32">
                  <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">Completion</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${
                        task.status === 'Scheduled' ? 'bg-[#3a5f94]' :
                        task.status === 'In Progress' ? 'bg-amber-500' :
                        task.status === 'Delayed' ? 'bg-[#460003]' : 'bg-green-600'
                      }`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <span className={`text-[10px] font-bold ${task.status === 'Completed' ? 'text-green-700' : 'text-slate-500'}`}>{task.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-[10px] rounded-full font-black uppercase tracking-tighter ${
                  task.status === 'Scheduled' ? 'bg-[#d5e3ff] text-[#001b3c]' :
                  task.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                  task.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {task.status}
                </span>
                <span className={`material-symbols-outlined ${task.status === 'Completed' ? 'text-green-600' : 'text-slate-300'}`}>
                  {task.status === 'Completed' ? 'check_circle' : 'more_vert'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}