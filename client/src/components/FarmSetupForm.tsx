import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Plus, Trash2, Info, Sprout, FlaskConical, Map as MapIcon, Warehouse, Users, Bug, FileBadge, Handshake, FileText, Settings } from "lucide-react"
import { saveFarmSetup } from "../services/farmService"

export default function FarmSetupForm() {
    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
            general: {
                farmName: "Sầu riêng",
                totalArea: "",
                totalTrees: "",
                harvestStartYear: "",
                lastYearYield: "",
                forecastYield: ""
            },
            varieties: [
                { name: "Ri6", origin: "", count: 120, stage: "Kinh doanh" }
            ],
            plots: [
                { name: "Lô A1", area: 1.2, trees: 150, rows: 10 }
            ],
            quickTests: [
                { name: "pH đất", value: "", unit: "" },
                { name: "N (Đạm tổng số)", value: "", unit: "%" },
                { name: "P (Lân hữu hiệu)", value: "", unit: "mg/100g" },
                { name: "K (Kali hữu hiệu)", value: "", unit: "mg/100g" }
            ],
            labor: {
                count: "",
                training: "Đã tập huấn đầy đủ"
            }
        }
    })

    const { fields: varietyFields, append: appendVariety, remove: removeVariety } = useFieldArray({ control, name: "varieties" });
    const { fields: testFields, append: appendTest, remove: removeTest } = useFieldArray({ control, name: "quickTests" });
    const { fields: plotFields, append: appendPlot, remove: removePlot } = useFieldArray({ control, name: "plots" });

    const onSubmit = async (data: any) => {
        console.log("Form Data:", data);
        try {
            const result = await saveFarmSetup(data);
            if (result.success) {
                alert("Dữ liệu đã được lưu thành công! ID: " + result.id);
            } else {
                alert("Lỗi khi lưu dữ liệu: " + result.error);
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra.");
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-green-700">THIẾT LẬP HỒ SƠ VƯỜN/FARM (GAP)</h1>
                    <p className="text-muted-foreground mt-2">Mã vườn: <span className="font-mono font-bold text-black">VT-DL-001</span></p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* I. General Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl"><div className="p-2 bg-green-100 text-green-600 rounded mr-3"><Info size={20} /></div> I. Thông tin chung & Năng suất</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1"><Label>Loại Cây trồng</Label><Input {...register("general.farmName")} readOnly className="bg-slate-100" /></div>
                            <div className="space-y-1"><Label>Tổng diện tích (ha)</Label><Input type="number" step="0.1" {...register("general.totalArea")} placeholder="VD: 2.5" /></div>
                            <div className="space-y-1"><Label>Tổng số cây</Label><Input type="number" {...register("general.totalTrees")} placeholder="VD: 1500" /></div>
                            <div className="space-y-1"><Label>Năm bắt đầu thu hoạch</Label><Input type="number" {...register("general.harvestStartYear")} placeholder="VD: 2020" /></div>
                            <div className="space-y-1"><Label>Sản lượng năm trước (Tấn)</Label><Input type="number" step="0.1" {...register("general.lastYearYield")} placeholder="VD: 15.5" /></div>
                            <div className="space-y-1"><Label>Sản lượng dự báo (Tấn)</Label><Input type="number" step="0.1" {...register("general.forecastYield")} placeholder="Tự động tính" readOnly className="bg-slate-100" /></div>
                        </CardContent>
                    </Card>

                    {/* II. Varieties */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl"><div className="p-2 bg-green-100 text-green-600 rounded mr-3"><Sprout size={20} /></div> II. Thông tin Giống & Cây trồng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {varietyFields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded bg-slate-50 items-end">
                                    <div className="space-y-1"><Label>Tên Giống</Label><Input {...register(`varieties.${index}.name`)} /></div>
                                    <div className="space-y-1"><Label>Nguồn gốc</Label><Input {...register(`varieties.${index}.origin`)} placeholder="Nơi cung cấp" /></div>
                                    <div className="space-y-1"><Label>Số lượng</Label><Input type="number" {...register(`varieties.${index}.count`)} /></div>
                                    <div className="flex gap-2 items-end w-full">
                                        <div className="space-y-1 flex-1"><Label>Giai đoạn</Label>
                                            <select {...register(`varieties.${index}.stage`)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                                <option>Cây non</option><option>Phục hồi</option><option>Kinh doanh</option>
                                            </select>
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeVariety(index)}><Trash2 size={16} /></Button>
                                    </div>
                                </div>
                            ))}
                            <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => appendVariety({ name: "", origin: "", count: 0, stage: "Kinh doanh" })}><Plus className="mr-2 h-4 w-4" /> Thêm giống</Button>
                        </CardContent>
                    </Card>

                    {/* III. Soil & Env */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl"><div className="p-2 bg-green-100 text-green-600 rounded mr-3"><FlaskConical size={20} /></div> III. Thổ nhưỡng & Môi trường</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1"><Label>Loại đất</Label><Input placeholder="VD: Đất đỏ bazan" /></div>
                                <div className="space-y-1"><Label>Nguồn nước</Label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background border-slate-200">
                                        <option>Sông/suối</option><option>Giếng khoan</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-4 border rounded bg-slate-50">
                                <h3 className="font-semibold mb-3">Kết quả Test nhanh (IoT/Kit)</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-4 gap-2 font-medium text-sm text-gray-500">
                                        <div>Chỉ số</div><div>Giá trị</div><div className="col-span-2">Đơn vị</div>
                                    </div>
                                    {testFields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-4 gap-2 items-center">
                                            <Input {...register(`quickTests.${index}.name`)} className="font-semibold" />
                                            <Input {...register(`quickTests.${index}.value`)} type="number" step="0.01" />
                                            <div className="col-span-2 flex gap-2">
                                                <Input {...register(`quickTests.${index}.unit`)} />
                                                <Button type="button" variant="ghost" size="icon" className="hover:text-red-500" onClick={() => removeTest(index)}><Trash2 size={16} /></Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => appendTest({ name: "", value: "", unit: "" })}><Plus className="mr-2 h-4 w-4" /> Thêm chỉ số</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* IV. Map & Plots */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl"><div className="p-2 bg-blue-100 text-blue-600 rounded mr-3"><MapIcon size={20} /></div> IV. Sơ đồ & Lô trồng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div> 1. Tạo Lô/Khu vực</h3>
                                {plotFields.map((field, index) => (
                                    <div key={field.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg space-y-3">
                                        <div className="flex justify-between">
                                            <Input {...register(`plots.${index}.name`)} className="w-1/3 font-bold" />
                                            <Button type="button" variant="ghost" className="text-red-500" onClick={() => removePlot(index)}><Trash2 size={16} /></Button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1"><Label>Diện tích (ha)</Label><Input type="number" {...register(`plots.${index}.area`)} /></div>
                                            <div className="space-y-1"><Label>Số cây</Label><Input type="number" {...register(`plots.${index}.trees`)} /></div>
                                            <div className="space-y-1"><Label>Số hàng</Label><Input type="number" {...register(`plots.${index}.rows`)} /></div>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" className="w-full border-dashed border-blue-200 text-blue-600" onClick={() => appendPlot({ name: "Lô Mới", area: 0, trees: 0, rows: 0 })}><Plus className="mr-2 h-4 w-4" /> Thêm Lô mới</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* V. Facilities */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center text-xl"><div className="p-2 bg-purple-100 text-purple-600 rounded mr-3"><Warehouse size={20} /></div> V. Cơ sở vật chất</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1"><Label>Tình trạng kho</Label><select className="w-full p-2 border rounded"><option>Có kho riêng, kiên cố</option><option>Kho tạm</option></select></div>
                                <div className="space-y-1"><Label>Phương án rác thải</Label><select className="w-full p-2 border rounded"><option>Thu gom tập trung</option></select></div>
                            </div>
                            <div className="space-y-1"><Label>Trang thiết bị chính</Label><Textarea placeholder="Máy cày, máy phun..." /></div>
                        </CardContent>
                    </Card>

                    {/* VI. Labor */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center text-xl"><div className="p-2 bg-indigo-100 text-indigo-600 rounded mr-3"><Users size={20} /></div> VI. Nhân sự</CardTitle></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1"><Label>Số lao động thường xuyên</Label><Input type="number" {...register("labor.count")} /></div>
                            <div className="space-y-1"><Label>Tập huấn VietGAP</Label><select {...register("labor.training")} className="w-full p-2 border rounded"><option>Đã tập huấn đầy đủ</option><option>Chưa tập huấn</option></select></div>
                        </CardContent>
                    </Card>

                    {/* VII. Inputs */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center text-xl"><div className="p-2 bg-red-100 text-red-600 rounded mr-3"><Bug size={20} /></div> VII. Vật tư & Sâu bệnh</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded bg-slate-50">
                                <h3 className="font-semibold mb-2">Quản lý thuốc BVTV</h3>
                                <p className="text-sm text-gray-500 mb-2">Danh mục thuốc cho phép sử dụng</p>
                                <div className="h-16 bg-white border rounded"></div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle className="flex items-center text-xl"><div className="p-2 bg-yellow-100 text-yellow-600 rounded mr-3"><FileBadge size={20} /></div> VIII. Chứng nhận</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="w-4 h-4" /> VietGAP</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4" /> GlobalGAP</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4" /> Organic</label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white/80 backdrop-blur p-4 border-t z-10">
                        <Button variant="outline" type="button">Hủy bỏ</Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white min-w-[200px]" type="submit">Lưu Hồ Sơ</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
